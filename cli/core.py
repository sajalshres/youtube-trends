from asyncio.log import logger
import json
import glob
import logging
import pandas as pd
from rich.progress import track

from utils import get_db


class ETL:
    def __init__(self, config):
        self.path = config["data_dir"]
        self.db = get_db(
            username=config["mongodb_username"],
            password=config["mongodb_password"],
            host=config["mongodb_host"],
            port=config["mongodb_port"],
        )

    def download(self, force=False):
        from kaggle import api

        if not glob.glob(f"{self.path}/*_youtube_trending_data.csv") or not force:
            logging.info("Data already exists, skipping")
            return

        logging.info("Downloading dataset from kaggle")
        api.authenticate()
        api.dataset_download_files(
            "rsrishav/youtube-trending-video-dataset", path=self.path, unzip=True
        )

    @property
    def countries(self):
        countries = [
            item.split("/")[-1].split("_")[0]
            for item in glob.glob(f"{self.path}/*_youtube_trending_data.csv")
        ]
        countries.sort()
        return countries

    def data(self, country):
        data = pd.read_csv(f"{self.path}/{country}_youtube_trending_data.csv")
        columns = {
            "video_id": "video_id",
            "title": "title",
            "publishedAt": "published_at",
            "channelId": "channel_id",
            "channelTitle": "channel_title",
            "categoryId": "category_id",
            "trending_date": "trending_date",
            "tags": "tags",
            "view_count": "view_count",
            "likes": "likes",
            "dislikes": "dislikes",
            "comment_count": "comment_count",
            "thumbnail_link": "thumbnail_link",
            "comments_disabled": "comments_disabled",
            "ratings_disabled": "ratings_disabled",
            "description": "description",
        }
        data = data.rename(columns=columns)

        return data

    def categories(self, country):
        # all dataset except for US are missing categoryId 29
        # so we are taking US as base for all
        with open(f"{self.path}/US_category_id.json") as file:
            raw_data = json.load(file)["items"]
            data = {int(item["id"]): item["snippet"]["title"] for item in raw_data}

        return pd.DataFrame(
            data={
                "id": list(data.keys()),
                "name": list(data.values()),
            }
        )

    def clean(self, data):
        data = data.drop_duplicates(["video_id"], keep="last")

        # remove unused columns
        unused_columns = ["thumbnail_link", "description"]
        data = data.drop(unused_columns, axis=1)

        return data

    def run(self):
        for country in track(self.countries, description="Processing..."):
            # get data
            df = self.data(country)
            categories_df = self.categories(country)

            logging.debug(
                f"Country {country} has {len(df)} rows and {len(categories_df)} categories"
            )

            # remove categories with no data
            current_categories = df.category_id.unique()
            current_categories.sort()
            categories_df = categories_df[categories_df["id"].isin(current_categories)]

            logging.debug(f"{len(categories_df)} categories after cleaning")

            df = self.clean(data=df)

            df.category_id = df.category_id.map(
                lambda id: categories_df[categories_df.id == id].name.values[0]
            )
            df = df.rename(columns={"category_id": "category"})

            logging.debug(f"{len(df)} rows after cleaning")

            collection = self.db[country.lower()]
            collection.drop()

            collection.insert_many(df.to_dict(orient="records"))
            logger.debug(
                f"{collection.count_documents({})} records added to collection {country.lower()}"
            )
