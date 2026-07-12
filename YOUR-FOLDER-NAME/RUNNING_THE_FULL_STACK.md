# Running TransitOps end-to-end (backend + React frontend)

This adds a REST API layer to the existing Spring Boot backend and a new React
frontend under `frontend/` that consumes it.

## What was added to the backend

- `controller/` — one REST controller per entity (Vehicle, Driver, Trip, FuelLog,
  MaintenanceLog, Expense, User, Role), all under `/api/...`. None of these existed
  before — the repo only had entities, repositories, and services.
- `config/SecurityConfig.java` — permits all `/api/**` requests and enables CORS for
  `localhost:*`. **This is a dev-mode config** — `spring-boot-starter-security` was
  already a dependency but had no config class, so without this every endpoint would
  have been blocked behind Spring's default Basic Auth. Before any real deployment,
  swap `permitAll()` for real route rules backed by the existing User/Role entities.
- `config/GlobalExceptionHandler.java` — turns validation errors and the service
  layer's `RuntimeException`s into clean JSON the frontend can read.

## 1. Start the database

The backend expects MySQL at `localhost:3306` with a schema `transitops_db`
(auto-created — see `application.properties`). Update the username/password there
if yours differ.

Also worth doing before you push this anywhere: `application.properties` currently
has a real DB password committed in plain text — move it to an environment variable
or a git-ignored `application-local.properties`.

## 2. Start the backend

```bash
cd backend
./mvnw spring-boot:run
```

Runs on **http://localhost:8081**. Swagger UI (springdoc is already a dependency) is
at `http://localhost:8081/swagger-ui.html` if you want to poke the API directly.

## 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on **http://localhost:5173** and points at `http://localhost:8081/api` by
default (`frontend/.env`).

## API surface added

| Resource | Base path |
|---|---|
| Vehicles | `/api/vehicles` |
| Drivers | `/api/drivers` |
| Trips | `/api/trips` |
| Fuel logs | `/api/fuel-logs` |
| Maintenance logs | `/api/maintenance-logs` |
| Expenses | `/api/expenses` |
| Users | `/api/users` |
| Roles | `/api/roles` |

Each supports `GET` (list + filters), `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}`,
plus a few resource-specific query endpoints (e.g. `/api/drivers/expiring-licenses`,
`/api/vehicles/stats/count-by-status`).

## Known gap

I couldn't run `mvn`/`./mvnw` in this sandbox (Maven Central isn't reachable from
here), so the backend changes are reviewed by hand against your existing service
interfaces rather than compiled. The frontend **was** built and linted successfully.
Worth doing a `./mvnw spring-boot:run` locally before you demo it, just in case.
