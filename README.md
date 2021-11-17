# Airport Transfer 🚃🚗✈️🚄

In order to run this app, we assume that you have already got Docker installed on your machine.

Instruction:

1. Navigate to directory hold this repo. For example: `cd airport-transfer`.

2. Run `docker compose up -d` and wait until everything is running.

3. Open your browser and navigate to following address:
    1. [localhost:3000](http://localhost:3000) if you want to manage your vehicles, policies and schedule
    2. [localhost:3001](http://localhost:3001) for browsing and booking vehicles
    3. [localhost:3002](http://localhost:3002) is designed for administration works.

## Microservices Architecture with an API Gateway and using message queue (RabbitMQ) for service communication

![alt text](../airport-transfer/assets/Architecture.png)
