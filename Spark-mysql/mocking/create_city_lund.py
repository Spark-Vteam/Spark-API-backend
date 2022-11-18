import json
from urllib.request import urlopen

url = "https://katalog.lund.se/rowstore/dataset/b028991c-2e85-4b6c-97a8-9afc2dc18016"
response = urlopen(url)
data = json.load(response)["results"]
city = "Lund"
separator = ","

with open('../sql/insert-2-stations-lund.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Stations\n")
    fh.write("    ( Name, City, Position )\n")
    fh.write("VALUES\n")
    
    for i, station in enumerate(data):
        name = station["name"]
        if station["lat"] == ",":
            station["lat"] = station["lat"][1:]
        position = f'{station["lat"]},{station["long"]}'
        if i == len(data) - 1:
            separator = ";"

        fh.write(f"      ('{name}', '{city}', '{position}'){separator}\n")
