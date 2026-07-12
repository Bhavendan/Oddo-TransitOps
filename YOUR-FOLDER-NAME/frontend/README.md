# TransitOps — Frontend

React (Vite) dashboard for the TransitOps fleet operations backend.

## Setup

```bash
npm install
npm run dev
```

Runs at http://localhost:5173 by default. It talks to the Spring Boot backend at the URL
in `.env` (`VITE_API_BASE_URL`, defaults to `http://localhost:8081/api`).

## Pages

- **Dashboard** (`/`) — fleet snapshot, live dispatched trips, license/maintenance alerts
- **Dispatch & Trips** (`/trips`) — trip list with status filters + "New trip" form
- **Fleet** (`/vehicles`) — vehicle list with status filters + "Register vehicle" form
- **Drivers** (`/drivers`) — licence expiry, safety scores + "Add driver" form
- **Maintenance & Fuel** (`/maintenance`) — service + fuel logs, quick-add forms for both
- **Expenses** (`/expenses`) — recent expenses + breakdown by type
- **Users & Roles** (`/users`) — user list + "Invite user" form

## Notes

- All data is live from the backend — no mock data. Each page shows a loading state,
  an error state (with retry) if the API call fails, and an empty state if there's
  nothing to show yet.
- Forms that reference another entity (a trip's vehicle/driver, a fuel log's vehicle,
  etc.) send it as `{ "vehicleId": <id> }` / `{ "driverId": <id> }`, matching how the
  Spring Data JPA `@ManyToOne` relations resolve on the backend.
- Field-level validation errors from the backend's `@Valid` annotations are surfaced
  under each input.
