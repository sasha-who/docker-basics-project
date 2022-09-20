# Docker Commands

**Create network**

```console
docker network create mongo-network
```

**Pull mongo image and run container on port 27017**

```console
docker pull mongo
```

```console
docker run -d \
-p 27017:27017 \
--name mongodb \
--net mongo-network \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
mongo
```

**Pull mongo-express image and run container on port 8080**

```console
docker pull mongo-express
```

```console
docker run \
-p 8080:8081 \
--name mongo-express \
--net mongo-network \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb \

**Create app image and run app container**

```console
docker build -t app .
```

```console
docker run -it \
-p 3000:3000 \
--name app \
--net mongo-network \
app
```
