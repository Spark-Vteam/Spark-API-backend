import random
import json
from urllib.request import urlopen

APIKEY = "9b82b424-7d75-466b-9e0e-27fc5c08b3f5"
url = f"https://openparking.stockholm.se/LTF-Tolken/v1/servicedagar/weekday/m%C3%A5ndag?outputFormat=json&apiKey={APIKEY}"
response = urlopen(url)
data = json.load(response)["features"]

separator = ","
radius = 0.02
last_name = ""

with open('../sql/insert-3-bikes-stockholm.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Bikes\n")
    fh.write("    ( Position, Battery, Status, Speed )\n")
    fh.write("VALUES\n")
    for i, station in enumerate(data):
        name = station["properties"]["STREET_NAME"]
        if name == "<Gatunamn saknas>":
            name = station["properties"]["CITY_DISTRICT"]

        position = [station["geometry"]["coordinates"][0][1],station["geometry"]["coordinates"][0][0]]
        
        if name != last_name:
            for n in range(0, 2):
                destination_lat = random.uniform(float(position[0])-radius,float(position[0])+radius) # Calculate destination latitude based on radius from "radius" variable
                destination_lon = random.uniform(float(position[1])-radius,float(position[1])+radius) # Calculate destination longitude based on radius from "radius" variable
                new_position = f"{destination_lat},{destination_lon}"
                
                battery = random.randint(0,100)

                if battery < 3:
                    status = 30
                else:
                    if battery < 60 and battery > 53:
                        status = 50
                    else:
                        status = 10
                
                speed = 0
                fh.write(f"      ('{new_position}', '{battery}', '{status}', '{speed}'){separator}\n")

            for n in range(0,3):
                battery = random.randint(0,100)
                status = 40
                speed = 0
                if i == len(data) - 1 and n == 2:
                    separator = ";"
                fh.write(f"      ('{position[0]},{position[1]}', '{battery}', '{status}', '{speed}'){separator}\n")

        last_name = name

