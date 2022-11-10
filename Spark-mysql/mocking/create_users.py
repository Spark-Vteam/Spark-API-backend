# If "ModuleNotFoundError: No module named 'faker'"
# Run "python3 -m pip install Faker" in console to add Faker package

from faker import Faker
import random

fake = Faker()

def get_first_name():
    return fake.first_name()

def get_last_name():
    return fake.last_name()

def get_phone_number():
    return fake.phone_number()

def get_email_adress(first_name, last_name):
    separators = [".","-","_"]
    address = first_name[0] + separators[random.randint(0, len(separators) - 1)] + last_name + str(random.randint(50,99)) + "@"
    return address + fake.free_email_domain()

def get_balance():
    return random.randint(0,1000)

def get_password():
    return "password"

def generate_user():
    first_name = get_first_name()
    last_name = get_last_name()
    return [first_name, last_name, get_phone_number(), get_email_adress(first_name, last_name), get_balance(), get_password()]

with open('../sql/insert-1users.sql', 'w') as fh:
    fh.write("USE 'mydb'\n")
    fh.write("INSERT INTO Users\n")
    fh.write("    ( FirstName, LastName, PhoneNumber, EmailAdress, Balance, Password )\n")
    fh.write("VALUES\n")
    counter = 1
    for n in range(1,1000):
        user = generate_user()
        symbol = ","
        if counter == 999:
            symbol = ";"
        fh.write(f"    ('{user[0]}', '{user[1]}', '{user[2]}', '{user[3]}', {user[4]}, '{user[5]}'){symbol}\n")
        counter += 1