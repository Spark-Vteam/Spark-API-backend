# Spark API

This is a sub module of the Spark project. It contains code for the API application. Follow instructions below to start up the API only. To start up all backend and frontend applications, follow the the README instructions in the main Spark repo instead.

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-API-backend/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-API-backend/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-API-backend/badges/build.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-API-backend/build-status/main)
[![Node.js CI](https://github.com/Spark-Vteam/Spark-API-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/Spark-Vteam/Spark-API-backend/actions/workflows/node.js.yml)

## Using API

This api is run in a docker container together with a MySQL database, so in order to start go to the Spark-backend directory where the [docker-compose.yml](https://github.com/Spark-Vteam/Spark-API-backend/blob/main/docker-compose.yml) is
 and type the following commands:

```
# First time downloading this project then run
docker compose build

# Start the database in the background
docker compose up -d db

# Start the API server
docker compose up server
```

## Obtain an API-Key

After starting up the server, you need to get a API in order to get access to the routes. 

```
curl --location --request POST 'localhost:4000/apiKey' \
--data-urlencode 'emailAdress=<email>' \
--data-urlencode 'organization=<organisation>'
```
After receiving the API key it needs to added in the request Header.

## Test the app

Inside the server container run:

```
npm run test
```
