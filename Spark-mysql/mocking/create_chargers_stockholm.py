separator = ","

with open('../sql/insert-4-chargers-stockholm.sql', 'w') as fh:
    fh.write("USE mydb\n")
    fh.write("INSERT INTO Chargers\n")
    fh.write("    ( Stations_id, Status )\n")
    fh.write("VALUES\n")
    counter = 101
    for n in range(0, 247):
        for k in range(0,3):
            fh.write(f"      ('{counter}', '20'){separator}\n")
        for k in range(0,2):
            if n == 246 and k == 1:
                separator = ";"
            fh.write(f"      ('{counter}', '10'){separator}\n")
        counter += 1
