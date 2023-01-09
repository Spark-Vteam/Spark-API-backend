USE spark
INSERT INTO Admins
    ( FirstName, LastName, PhoneNumber, EmailAdress, Authority, Password )
VALUES
    ('Emmie', 'Service', '123-1337', 'emmie@oauth-guro.se', 10, '$2a$10$fJ3jTj4yh2Y3USYmSgQRy.59OBE8DmSlGx6LxD1.ou92jsMDTkMza'),
    ('Frida', 'Webadmin', '456-1337', 'frida@hAPI.se', 20, '$2a$10$fJ3jTj4yh2Y3USYmSgQRy.59OBE8DmSlGx6LxD1.ou92jsMDTkMza'),
    ('Erik', 'Masteradmin', '789-1337', 'erik@expo-experto.se', 30, '$2a$10$fJ3jTj4yh2Y3USYmSgQRy.59OBE8DmSlGx6LxD1.ou92jsMDTkMza');