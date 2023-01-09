USE spark
INSERT INTO Pricings
    ( Type, Description, Start, Minute, Parking, DiscountStartFree, DiscountEndParkingZone, DiscountEndCharging )
VALUES
    ('default', 'standard pricing plan', 15, 3, 10, 50, 50, 100);