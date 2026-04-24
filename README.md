# Academic Portal — Full-Stack Application

A full-stack academic management system built with **React + Vite + TypeScript** (frontend) and **Node.js + Express + MongoDB** (backend), featuring role-based dashboards for Students, Teachers, and Admins.

---

## 🚀 Features

### Student Dashboard
- View personal attendance percentages per subject (live from DB)
- Browse notices and announcements (live from DB)
- Personalized home with attendance warnings for subjects below 75%
- View grades, timetable, and academic profile

### Teacher Dashboard
- Mark attendance for classes with real student data (live from DB)
- Post/manage notices (publish, draft, delete — live from DB)
- View class performance metrics

### Admin Dashboard
- Manage all users (students, teachers, admins — live from DB)
- View system health and department statistics
- User activation/deactivation controls

### Authentication
- Email + password login with JWT
- Role-based access control (student / teacher / admin)
- Session persistence via localStorage
- Auto-logout on token expiry

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, Radix UI |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (jsonwebtoken), bcryptjs |
| HTTP Client | Axios (frontend) |

---

## 📋 Prerequisites

- **Node.js** v18 or higher
- **MongoDB** running locally on `mongodb://localhost:27017`
  - [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Or use MongoDB Atlas (update `MONGO_URI` in `backend/.env`)

---

## ⚙️ Setup & Running

### 1. Clone / navigate to the project
```bash
cd "Academic Portal Final/Academic-Portal"
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Configure backend environment
The file `backend/.env` is already pre-configured for local development:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/academic_portal
JWT_SECRET=academic_portal_super_secret_key_2024_change_in_production
JWT_EXPIRES_IN=7d
```
> ⚠️ Change `JWT_SECRET` to a strong random string before deploying to production.

### 5. Seed the database
```bash
cd backend
npm run seed
cd ..
```
This creates all users, courses, attendance records, grades, and announcements.

### 6. Start the backend
```bash
cd backend
npm run dev
```
Server starts at **http://localhost:5000**

### 7. Start the frontend (in a new terminal)
```bash
npm run dev
```
App opens at **http://localhost:3000**

---

## 🔐 Default Test Credentials

| Role | Email | Password |
|---|---|---|
| Student | `nava@example.com` | `password123` |
| Teacher | `nilakshi@example.com` | `password456` |
| Admin | `nitha@example.com` | `password789` |

Additional students:
- `aryan@example.com` / `password123`
- `vishnu@example.com` / `password123`

Additional teachers:
- `minu@example.com` / `password456`
- `rekha@example.com` / `password456`

---

## 📁 Project Structure

```
Academic-Portal/
├── src/                          # Frontend (React + Vite + TypeScript)
│   ├── api/                      # ← NEW: API layer (Axios)
│   │   ├── client.ts             # Axios instance + interceptors
│   │   ├── auth.ts               # Auth API calls
│   │   ├── attendance.ts         # Attendance API calls
│   │   ├── announcements.ts      # Announcements/notices API calls
│   │   ├── students.ts           # Students API calls
│   │   ├── faculty.ts            # Faculty/users API calls
│   │   ├── grades.ts             # Grades API calls
│   │   └── courses.ts            # Courses API calls
│   ├── context/
│   │   └── AuthContext.tsx       # ← NEW: JWT auth context + session restore
│   ├── components/
│   │   ├── LoginPage.tsx         # ← UPDATED: uses email instead of ID
│   │   ├── student/
│   │   │   ├── StudentHome.tsx   # ← UPDATED: real API data
│   │   │   ├── StudentAttendance.tsx # ← UPDATED: real API data
│   │   │   └── StudentNotices.tsx    # ← UPDATED: real API data
│   │   ├── teacher/
│   │   │   ├── PostNotices.tsx   # ← UPDATED: real API data
│   │   │   └── MarkAttendance.tsx    # ← UPDATED: real API data
│   │   └── admin/
│   │       └── EditUsers.tsx     # ← UPDATED: real API data
│   └── App.tsx                   # ← UPDATED: uses AuthContext
│
├── backend/                      # ← NEW: Express + MongoDB backend
│   ├── src/
│   │   ├── models/               # Mongoose schemas (OOP class hierarchy)
│   │   │   ├── User.ts           # Base User class + discriminator parent
│   │   │   ├── Student.ts        # Extends User (rollNumber, semester)
│   │   │   ├── Faculty.ts        # Extends User (employeeId, courses)
│   │   │   ├── Course.ts         # Course model
│   │   │   ├── Grade.ts          # Grade model (auto-calculates letter grade)
│   │   │   ├── Attendance.ts     # Attendance model
│   │   │   └── Announcement.ts   # Announcements/notices model
│   │   ├── middleware/
│   │   │   ├── auth.ts           # JWT verifyToken middleware
│   │   │   └── roles.ts          # requireRole() RBAC middleware
│   │   ├── routes/
│   │   │   ├── auth.ts           # POST /login, POST /register, GET /me
│   │   │   ├── students.ts       # CRUD for students
│   │   │   ├── faculty.ts        # CRUD for faculty + all-users
│   │   │   ├── courses.ts        # CRUD for courses
│   │   │   ├── grades.ts         # GET/POST grades
│   │   │   ├── attendance.ts     # GET/POST attendance
│   │   │   └── announcements.ts  # CRUD for announcements
│   │   ├── server.ts             # Express app entry point
│   │   └── seed.ts               # Database seed script
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── vite.config.ts                # ← UPDATED: proxy /api → localhost:5000
└── README.md
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Login with email + password |
| POST | `/api/auth/register` | Public | Register new user |
| GET | `/api/auth/me` | Auth | Get current user from token |

### Students
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/students` | Admin, Teacher |
| GET | `/api/students/:id` | Self, Admin, Teacher |
| PUT | `/api/students/:id` | Admin |
| DELETE | `/api/students/:id` | Admin |

### Attendance
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/attendance/student/:id` | Self, Teacher, Admin |
| GET | `/api/attendance/course/:courseId` | Teacher, Admin |
| POST | `/api/attendance` | Teacher, Admin |

### Announcements
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/announcements` | All authenticated |
| GET | `/api/announcements/all` | Teacher, Admin |
| POST | `/api/announcements` | Teacher, Admin |
| PUT | `/api/announcements/:id` | Author, Admin |
| DELETE | `/api/announcements/:id` | Author, Admin |

---

## 🧠 OOP Model Hierarchy

```
UserClass (base)
├── StudentClass extends UserClass
│   └── rollNumber, semester, getSemesterLabel()
└── FacultyClass extends UserClass
    └── employeeId, courses[], addCourse(), removeCourse()

CourseClass         — id, name, code, facultyId, credits, getFullTitle()
GradeClass          — studentId, courseId, marks, grade, calculateGrade(), isPassing()
AttendanceClass     — studentId, courseId, date, status, isPresent(), calculatePercentage()
```

MongoDB uses Mongoose **discriminators** for User/Student/Faculty — all stored in a single `users` collection with a `role` field discriminator key.

---

## 👥 Team

Built with ❤️ by the Academic Portal Team.

---

## ⚠️ Notes

- The frontend uses `role: 'teacher'` for display. The backend stores `role: 'faculty'` in MongoDB but maps it to `'teacher'` in JWT payloads for frontend compatibility.
- Attendance percentage < 75% triggers a warning banner on the student dashboard.
- All components include graceful fallbacks to hardcoded data when the backend is unavailable.
