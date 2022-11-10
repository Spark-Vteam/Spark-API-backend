import random

amounts = [10, 15, 20]
with open('../sql/insert-3chargers.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Chargers\n")
    fh.write("    ( Stations_id, Status )\n")
    fh.write("VALUES\n")
    counter = 1
    for n in range(1, 657):
        amount = amounts[random.randint(0,2)]
        for n in range(1,amount):
            fh.write(f"      ('{counter}', '100'),\n")
        counter += 1
