APIKEY = "9b82b424-7d75-466b-9e0e-27fc5c08b3f5"

import json
from urllib.request import urlopen

url = f"https://openparking.stockholm.se/LTF-Tolken/v1/servicedagar/weekday/m%C3%A5ndag?outputFormat=json&apiKey={APIKEY}"
response = urlopen(url)
data = json.load(response)["features"]
city = "Stockholm"
separator = ","
last_name = ""

with open('../sql/insert-2-stations-stockholm.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Stations\n")
    fh.write("    ( Name, City, Position )\n")
    fh.write("VALUES\n")

    for i, station in enumerate(data):
        name = station["properties"]["STREET_NAME"]
        if name == "<Gatunamn saknas>":
            name = station["properties"]["CITY_DISTRICT"]
        if name != last_name:
        # if station["properties"]["STREET_NAME"] != last_name:
            lat = station["geometry"]["coordinates"][0][1]
            lon = station["geometry"]["coordinates"][0][0]
            position = f"{lat},{lon}"
            if i == len(data) - 1:
                separator = ";"

            fh.write(f"      ('{name}', '{city}', '{position}'){separator}\n")
        last_name = name
