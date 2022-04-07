import json
import configparser
from os import path, chmod
from pathlib import Path
from pymongo import MongoClient

from exceptions import NotInitialized


def get_home_dir():
    user_home_dir = str(Path.home())
    home_dir = f"{user_home_dir}/.youtube-trends"
    return home_dir


def get_db(
    username, password, host="localhost", port=27017, database="youtube_trend_db"
):
    mongo_uri = f"mongodb://{username}:{password}@{host}:{port}"
    client = MongoClient(mongo_uri)

    return client[database]


def init_kaggle_auth(username, key):
    path = f"{str(Path.home())}/.kaggle"

    # Create directory
    Path(path).mkdir(parents=True, exist_ok=True)

    # data
    data = {"username": username, "key": key}

    with open(f"{path}/kaggle.json", "w") as file:
        json.dump(data, file, indent=4)

    chmod(f"{path}/kaggle.json", 0o600)


def init_config(**kwargs):
    # Create directory
    Path(get_home_dir()).mkdir(parents=True, exist_ok=True)

    config = configparser.ConfigParser()
    config["DEFAULT"] = {}

    for key, value in kwargs.items():
        config["DEFAULT"][key] = str(value)

    with open(f"{get_home_dir()}/config.ini", "w") as config_file:
        config.write(config_file)


def config():
    config_file_path = f"{get_home_dir()}/config.ini"

    if not path.exists(config_file_path):
        raise NotInitialized("CLI is not initialized. Please run init first")

    config = configparser.ConfigParser()
    config.read(f"{get_home_dir()}/config.ini")

    return config["DEFAULT"]
