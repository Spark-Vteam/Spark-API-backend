separator = ","

with open('../sql/insert-4-chargers-xkarlskrona.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Chargers\n")
    fh.write("    ( Stations_id, Status )\n")
    fh.write("VALUES\n")
    counter = 348
    for n in range(0, 29):
        for k in range(0,7):
            fh.write(f"      ('{counter}', '20'){separator}\n")
        for k in range(0,3):
            if n == 28 and k == 2:
                separator = ";"
            fh.write(f"      ('{counter}', '10'){separator}\n")
        counter += 1
