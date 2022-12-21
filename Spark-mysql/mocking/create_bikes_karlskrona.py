import random

separator = ","
amount = 5
radius = 0.002
codes = [10, 50]

stations = [
    [56.1648946,15.5819756],
    [56.1650827,15.5849529],
    [56.1650669,15.5913558],
    [56.1634483,15.5928287],
    [56.1637916,15.5895426],
    [56.1642203,15.5887066],
    [56.1626401,15.5879663],
    [56.1611615,15.5889778],
    [56.160907,15.5851333],
    [56.1578996,15.5854079],
    [56.1579649,15.5836428],
    [56.1594618,15.5788129],
    [56.1629597,15.5734835],
    [56.1622518,15.5748944],
    [56.1619979,15.5791752],
    [56.160294,15.5787203],
    [56.1603649,15.5841648],
    [56.166488,15.5876581],
    [56.1684645,15.5841852],
    [56.1690021,15.5853225],
    [56.17155,15.5890329],
    [56.1729028,15.5868657],
    [56.1748889,15.5904596],
    [56.1750303,15.593298],
    [56.1750422,15.5961894],
    [56.1762008,15.5956369],
    [56.1784811,15.5991555],
    [56.1781527,15.6042678],
    [56.1814873,15.6009461]
]

with open('../sql/insert-3-bikes-xkarlskrona.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Bikes\n")
    fh.write("    ( Position, Battery, Status, Speed )\n")
    fh.write("VALUES\n")

    for i, station in enumerate(stations):
        position = station
        
        for n in range(0, 30):
            destination_lat = random.uniform(float(position[0])-radius,float(position[0])+radius) # Calculate destination latitude based on radius from "radius" variable
            destination_lon = random.uniform(float(position[1])-radius,float(position[1])+radius) # Calculate destination longitude based on radius from "radius" variable
            positionGen = f"{destination_lat},{destination_lon}"
            
            battery = random.randint(0,100)
            if battery < 3:
                status = 30
            else:
                if battery < 60 and battery > 53:
                    status = codes[1]
                else:
                    status = codes[0]
            
            speed = 0
            fh.write(f"      ('{positionGen}', '{battery}', '{status}', '{speed}'){separator}\n")

        for n in range(0,7):
            battery = random.randint(0,100)
            status = 40
            speed = 0
            if i == len(stations) - 1 and n == 4:
                separator = ";"
            fh.write(f"      ('{position[0]},{position[1]}', '{battery}', '{status}', '{speed}'){separator}\n")

