# LocalFix backend

This is the simple Express and MongoDB API for LocalFix.

## Setup

1. Install MongoDB locally, or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env`.
3. Set `MONGO_URI` in `.env`.
4. Install packages:

```bash
npm install
```

5. Add the sample services and providers:

```bash
npm run seed
```

6. Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## Routes

```text
GET    /api/health
GET    /api/services
GET    /api/providers
GET    /api/providers?service=electrician
GET    /api/providers/:id
POST   /api/requests
GET    /api/requests
GET    /api/requests?provider=Ravi%20Electrical%20Services
PATCH  /api/requests/:id/status
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

The frontend uses `http://localhost:5000/api` by default. To change it, create
`frontend/.env` with:

```text
VITE_API_URL=http://localhost:5000/api
```

Authentication uses JWT tokens. The frontend stores the returned token and
sends it with protected requests. Customer requests are linked to the logged-in
customer, and providers can update only their own requests.
