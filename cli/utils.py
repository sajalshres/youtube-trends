from pymongo import MongoClient


def get_db(
    username, password, host="localhost", port=27017, database="youtube_trend_db"
):
    mongo_uri = f"mongodb://{username}:{password}@{host}:{port}"
    client = MongoClient(mongo_uri)

    return client[database]
