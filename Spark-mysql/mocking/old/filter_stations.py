import json

with open('stations.sql', 'w') as fh:
    fh.write("USE 'mydb'\n")
    fh.write("INSERT INTO Stations\n")
    fh.write("    ( Name, City, Position )\n")
    fh.write("VALUES\n")
    
    with open('../sql/insert-2stations.json') as fs:
        data = json.load(fs)
        for station in data:
            city = station["AdvertisedLocationName"]
            wgs84 = station["Geometry"]["WGS84"][7:-1].split()
            position = f"{wgs84[1]},{wgs84[0]}"

            if city[-1] == "C":
                city = city[0:-2]

            name = city + " Station"

            fh.write(f"      ('{name}', '{city}', '{position}'),\n")
    fh.write(";")


