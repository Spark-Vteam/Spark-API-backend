# Spark Backend
This is a sub module of the Spark project.

The Spark Backend repository contains the three building blocks that makes the backend, Database, Client server and Bike server. Please read through the following documentation to get an understanding of the system should be operated. Although some services can be run individually, it is strongly advised to run them all together within a docker compose.

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-API-backend/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-API-backend/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-API-backend/badges/build.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-API-backend/build-status/main)
[![Node.js CI](https://github.com/Spark-Vteam/Spark-API-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/Spark-Vteam/Spark-API-backend/actions/workflows/node.js.yml)<br>
*Client server (REST API) emblems*

## Database

The database is built with MYSQL and is running inside a Docker container. By default the database is filled with mock data to simplify the testing of the Spark system.

### Credentials

```
DB_USER=root
DB_NAME=spark
DB_PORT=3306
DB_HOST=db
```

### Starting Database

```bash
# First time downloading this project then run
docker compose build

# Start the database in the background
docker compose up -d db
```

### Interact with the Database

All interaction with the database is made using stored procedures.
These are found in the data definition file **ddl.sql**. There the are organized by table.

####

Example

To call the following procedure
```sql
--
-- Procedure to fetch Geofences
--
DROP PROCEDURE IF EXISTS get_geofences;
DELIMITER ;;
CREATE PROCEDURE get_geofences()
	BEGIN
		SELECT * FROM Geofences
    WHERE Type != 40;
	END
;;
DELIMITER ;
```
You would format your SQL query as
```js
// JS example
const sql = 'call get_geofences()';
```

## Client server (REST API)

The Client server is a REST API built with node.js express, it delivers fast responses with great error handling in a version controlled package. To access it you will need an API key which you can read instructions on how to obtain below.

### Using the API

This api is run in a docker container together with a MySQL database, so in order to start go to the Spark-backend directory where the [docker-compose.yml](https://github.com/Spark-Vteam/Spark-API-backend/blob/main/docker-compose.yml) is
 and type the following commands:

```bash
# First time downloading this project then run
docker compose build

# Start the database in the background
docker compose up -d db

# Start the API server
docker compose up server
```

### Obtain an API-Key

After starting up the server, you need to get a API in order to get access to the routes. 

```bash
curl --location --request POST 'localhost:4000/apiKey' \
--data-urlencode 'emailAdress=<email>' \
--data-urlencode 'organization=<organisation>'
```
After receiving the API key it needs to added in the request Header.

### Test the app

Inside the server container run:

```bash
npm run test
```

## Bike Server

The bike server consist of a Python UDP server to handle traffic from physical bikes and relieve the client server from unnecessary data load. The server works with an immense speed and light weight, able to handle requests from a few thousand bikes every other second. Bike Servers are easy to scale horizontally with a load balancer as you need it to grow.

### Connect bike

To run the Bike Server use
```bash
# First time downloading this project then run
docker compose build

# Start the bike server in the background
docker compose up -d bike-server
```

To connect a bike to the Bike Server you want to point the bike's emit port and url to
```bash
bike-server:9898
```
The bike is already programmed to deliver the latest data in correct format every few seconds.


