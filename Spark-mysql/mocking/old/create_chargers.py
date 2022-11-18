import random

separator = ","
amounts = [10, 15, 20]
with open('../sql/insert-3chargers.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Chargers\n")
    fh.write("    ( Stations_id, Status )\n")
    fh.write("VALUES\n")
    counter = 1
    for n in range(1, 657):
        amount = 10
        for k in range(1,amount):
            if n == 656 and k == amount -1:
                separator = ";"
            fh.write(f"      ('{counter}', '100'){separator}\n")
        counter += 1
