#!/bin/bash

REPOSITORY=/home/ubuntu/app
cd /home/ubuntu
sudo mv -f prod.db $REPOSITORY
cd config
sudo cp .env $REPOSITORY
cd $REPOSITORY

docker kill $(docker ps -q)
docker-compose up --build -d
docker system prune -af