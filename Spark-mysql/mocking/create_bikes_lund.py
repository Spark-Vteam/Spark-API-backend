import random
import json
from urllib.request import urlopen

url = "https://katalog.lund.se/rowstore/dataset/b028991c-2e85-4b6c-97a8-9afc2dc18016"
response = urlopen(url)
data = json.load(response)["results"]

separator = ","
amount = 5
radius = 0.04
codes = [10, 50]

with open('../sql/insert-3-bikes-lund.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Bikes\n")
    fh.write("    ( Position, Battery, Status, Speed )\n")
    fh.write("VALUES\n")
    for i, station in enumerate(data):
        position = [station["lat"],station["long"]]
        if position[0][0] == ",":
            position[0] = position[0][1:]

        for n in range(0, 10):
            destination_lat = random.uniform(float(position[0])-radius,float(position[0])+radius) # Calculate destination latitude based on radius from "radius" variable
            destination_lon = random.uniform(float(position[1])-radius,float(position[1])+radius) # Calculate destination longitude based on radius from "radius" variable
            positionGen = f"{destination_lat},{destination_lon}"
            
            battery = random.randint(0,100)
            if battery < 3:
                status = 30
            else:
                if battery < 60 and battery > 53:
                    status = codes[0]
                else:
                    status = codes[1]
            
            speed = 0
            fh.write(f"      ('{positionGen}', '{battery}', '{status}', '{speed}'){separator}\n")

        for n in range(0,5):
            battery = random.randint(0,100)
            status = 40
            speed = 0
            if i == len(data) - 1 and n == 4:
                separator = ";"
            fh.write(f"      ('{positionGen}', '{battery}', '{status}', '{speed}'){separator}\n")

