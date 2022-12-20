import socket
from config.config import connect_to_database
from helpers.repeated_timer import RepeatedTimer
import mysql.connector

# Set UDP server host address
HOST = '0.0.0.0'

# Set UDP server port
PORT = 9898

# Make the connection to the database
connection = connect_to_database()


class BikeServer:
    """
    A class to wrap the server
    """
    def __init__(self) -> None:
        """
        Constructor
        """
        #String to be filled with values for the SQL query, defaults to empty string
        self.query = ""

    def db_update_bike(self):
        """
        Update Bike(s) in database
        """
        # If there is any values to insert, continue
        if self.query:

            # Copy the string of values to a new entry and reset the global to allow it to fill up
            query, self.query = self.query, ""

            try:
                # Create a cursor
                cursor = connection.cursor()

                # Execute the formatted SQL query
                cursor.execute(
                    "INSERT INTO Bikes"
                    "(id, Position, Battery, Status, Speed) "
                    f"VALUES {query[:-1]} AS new "
                    "ON DUPLICATE KEY UPDATE "
                    "id = new.id, "
                    "Position = new.Position, "
                    "Battery = new.Battery, "
                    "Status = new.Status, "
                    "Speed = new.Speed;")

                # Commit the changes
                connection.commit()

            # This error is thrown if the SQL query has a bad format
            except mysql.connector.errors.ProgrammingError:
                raise ValueError("INSERT INTO Bikes"
                    "(id, Position, Battery, Status, Speed) "
                    f"VALUES {query[:-1]} AS new "
                    "ON DUPLICATE KEY UPDATE "
                    "id = new.id, "
                    "Position = new.Position, "
                    "Battery = new.Battery, "
                    "Status = new.Status, "
                    "Speed = new.Speed;")
                # Print the attempted query
                print(f"You tried this: {query[:-1]}")

    def listen(self):
        """
        Listening server
        """
        # Define the socket in format "FAMILY","TYPE"
        UDP = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

        # Bind the server to address and port
        UDP.bind((HOST,PORT))
        print("UDP server up and listening")

        # Start to listen
        while(True):
            #  When message received, save msg and address
            msg, address = UDP.recvfrom(1024)

            # Decode the message, containing data from bike, and concatenate it to the global query
            self.query += f"{msg.decode('utf-8')},"

if __name__ == "__main__":
    # Create the server
    BS = BikeServer()

    # Set a thread to call the specified function every X seconds
    RepeatedTimer(5, BS.db_update_bike)

    # Server start listening
    BS.listen()
