import click
import logging
from rich.logging import RichHandler

from core import ETL
from utils import init_kaggle_auth, init_config, config


def configure_logger(debug=False):
    format = "%(message)s"
    level = logging.DEBUG if debug else logging.INFO
    logging.basicConfig(
        format=format,
        level=level,
        datefmt="%d-%b-%y %H:%M:%S",
        handlers=[
            RichHandler(show_time=True, show_level=True, omit_repeated_times=False)
        ],
    )


@click.group()
@click.option("--debug", "-d", "debug", is_flag=True)
@click.pass_context
def cli(ctx, debug):
    ctx.ensure_object(dict)
    ctx.obj["DEBUG"] = debug

    configure_logger(debug)


@cli.command()
@click.option("--kaggle-username", "kaggle_username", prompt="Kaggle username")
@click.option(
    "--kaggle-key",
    "kaggle_key",
    prompt="NOTE: visit https://www.kaggle.com/docs/api to get details of generating a new key\nKaggle key",
    hide_input=True,
)
@click.option("--mongodb-username", "mongodb_username", prompt="Mongodb username")
@click.option(
    "--mongodb-password", "mongodb_password", prompt="Mongodb password", hide_input=True
)
@click.option(
    "--mongodb-host", "mongodb_host", prompt="Mongodb host", default="localhost"
)
@click.option("--mongodb-port", "mongodb_port", prompt="Mongodb port", default=27017)
@click.option("--data-dir", "data_dir", prompt="Data directory", default="data")
def init(
    kaggle_username,
    kaggle_key,
    mongodb_username,
    mongodb_password,
    mongodb_host,
    mongodb_port,
    data_dir,
):
    init_kaggle_auth(username=kaggle_username, key=kaggle_key)
    init_config(
        mongodb_username=mongodb_username,
        mongodb_password=mongodb_password,
        mongodb_host=mongodb_host,
        mongodb_port=mongodb_port,
        data_dir=data_dir,
    )


@cli.command()
@click.option("--force", "-f", "force", help="Force download dataset", is_flag=True)
def download(force):
    etl = ETL(config=config())
    etl.download(force=force)


@cli.command()
@click.option("--force-download", "-fd", help="Force download dataset", is_flag=True)
def run(force_download):
    etl = ETL(config=config())

    # download the dataset
    etl.download(force=force_download)

    # run the etl process
    etl.run()


cli.add_command(init)
cli.add_command(download)
cli.add_command(run)
