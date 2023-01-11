# SPARK API

### Start the API

```
npm start

docker compose up server
```

### Generate an API-KEY to access routes

```
curl --location --request POST 'localhost:4000/apiKey' \
--data-urlencode 'emailAdress=bike-server@spark.se' \
--data-urlencode 'organization=spark'
```
