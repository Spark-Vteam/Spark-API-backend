separator = ","
amounts = [10, 15, 20]
amount = 10
with open('../sql/insert-4-chargers-lund.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Chargers\n")
    fh.write("    ( Stations_id, Status )\n")
    fh.write("VALUES\n")
    counter = 1
    for n in range(0, 100):
        for k in range(0,5):
            fh.write(f"      ('{counter}', '20'){separator}\n")
        for k in range(0,5):
            if n == 99 and k == 4:
                separator = ";"
            fh.write(f"      ('{counter}', '10'){separator}\n")
        counter += 1
