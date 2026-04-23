# Assignment 2b - Docker Container for Assignment 1a

## Aim

Create a Docker container environment and run the Assignment 1a responsive dashboard inside it.

## Run Locally Without Docker

From the `Ass2b` folder:

```bash
node server.js
```

Open `http://localhost:8000`.

## Build and Run with Docker

Run these commands from the `Ass2b` folder.

```bash
docker build -t ass2b-docker-app .
docker run --rm -p 8000:8000 ass2b-docker-app
```

Open `http://localhost:8000`.

## What the Container Includes

- Node.js runtime from `node:20-alpine`
- Static file server from `Ass2b/server.js`
- Assignment 1a dashboard files from `Ass2b/site`

## Conclusion

Docker packages the Assignment 1a web application with a small Node.js server, making the dashboard portable and runnable in a container environment.
