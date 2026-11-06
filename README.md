# ContribuTrack — Team Contribution Portfolio

Evidence-backed contribution tracking for student teams. Built with React + Vite, Express, MongoDB, JWT, Mongoose, and responsive CSS.

## Setup

1. Install and start MongoDB locally, or use MongoDB Atlas.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` and `JWT_SECRET`.
3. In two terminals:
   - `cd backend; npm install; npm run seed; npm run dev`
   - `cd frontend; npm install; npm run dev`
4. Open `http://localhost:5173`.

## Demo credentials

`aarav@college.edu` / `DemoPass1`  
`diya@college.edu` / `DemoPass1`  
`kabir@college.edu` / `DemoPass1`

## API

Authentication: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.

Protected CRUD: `/api/projects`, `/api/tasks`, `/api/contributions`; evidence endpoints are `/api/evidence`; peer-review endpoints are `/api/reviews`.

Insights: `GET /api/dashboard/stats`, `GET /api/dashboard/activity`, `GET /api/portfolio/:userId/:projectId`, `GET /api/portfolio/:userId/:projectId/summary`.

All protected calls require `Authorization: Bearer <token>`. The API has JWT authorization, bcrypt password hashing, validation, ownership checks, duplicate-review prevention, centralized errors, and consistent JSON responses.
