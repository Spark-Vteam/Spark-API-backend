FROM python:3.9

RUN pip3 install mysql-connector-python \
    python-dotenv

WORKDIR /usr/app/src

COPY . ./

EXPOSE 9898/udp