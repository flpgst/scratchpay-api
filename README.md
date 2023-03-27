# Scratchpay-api

## Description

Scratchpay API is a REST API with the implementation of the Coding Challenge proposed.

## Installation

Please follow the steps described below.

## Adding environment variables

Copy `.env.example` to `.env` and `.env.test`. In `.env.test` change `SERVER_PORT` value to `3001` or another free port.

## Running the app (with Docker)

#### 1) Install [docker-compose](https://docs.docker.com/compose/install/)

#### 2) Start containers

```bash
# Build Dockerfile and start
$ docker-compose up --build # Only for the first time or when you add a new package
# OR
$ docker-compose up -d # Start the service as a daemon, it'll run on the background without blocking the terminal
# OR
$ docker-compose up # Start the service in your terminal
```

#### 3) Developing in container

The volume of the container it is pointed to the local machine. So just updating local files will be reflected at container.

#### 4) Stop containers (optional)

```bash
$ docker-compose down
```

## Running the app (without Docker)

Need to use Node 18.x version. Because the app uses FecthAPI.

```bash
# install dependencies
$ npm i

# build the app (Optional)
$ npm run build

# run in development mode
$ npm run start:dev
```

## Test

Need to use Node 18.x version. Because the app uses FecthAPI.

```bash
$ npm run test
```

## File Structure

- `src/types`: Stores all basic types from the application. The simplest items from the solution and the interfaces to use these items;
- `src/app`: Stores the actions of the application. Normally, they are verbs. They have the business rules.
- `src/externals`: Keeps the externals items like Providers, Controllers, Routes, etc. They consume the business rules from `src/app`
- `server.ts`: Initiates the app

### Where the Automated Tests are located?

The unit tests are located together with the files, like:

```
- app/use-cases/clinic
 - list-clinic.spec.ts
 - list-clinic.ts
 - index.ts
```

The integration tests are located in:

```
- src/__tests__
```

### Accessing the API

Do a `GET` request to `localhost:3000/api/clinics`
It is possible to use the following query params to filter data:

- `name` : The fullname or partial name of a clinic;
- `state` : The name or acronym of a state;
- `time` : The hour in the format `hh:mm`.

### OpenAPI Doc

Access `localhost:3000/doc`
It is possible to perform requests inside the OpenAPI interface.
