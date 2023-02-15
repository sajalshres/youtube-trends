# youtube-trends

A dashboard for analysis and visualization of Youtube trends

## Requirements

- Docker
- Docker Compose

## Tech Stack

- ReactJS
- Nivo Charts(D3)
- JavaScript
- FastAPI
- Pandas and Numpy
- Python
- MongoDB
- Redis Cache

## Services

- CLI (ETL TOOL)
- Client
- Server
- Notebook

## Instructions

### ETL: Process data from kaggle
1. Get your kaggle api token from kaggle.com
2. Install cli:

    ```bash
    # Install cli dependencies
    $ python -m pip install -r cli/requirements.txt
    ```
3. Initialize cli and provide configuration

    ```bash
    # Initialize cli and insert config
    $ python cli init
    ```

**Note**: Default values are:
    1. Kaggle Username: <your-kaggle-username>
    2. Kaggle Key: <your-kaggle-api-key>
    3. Mongodb Username: admin
    4. Mongodb Password: Admin#2022
    5. Mongodb Host: localhost
    6. Mongodb Port: 27017
    7. Data Dir: .data

4. Download data

    ```bash
    $ python cli download
    ```

5. Process data and load into MongoDB:

    ```bash
    $ python cli run
    ```


### Start the instances

```bash
$ docker-compose up --build
```

Visit [http://localhost:3000](http://localhost:3000) in your local browser.
