# 🧩 SaaS Product Management Dashboard

A full-stack SaaS-style product management dashboard built with **Next.js, Firebase Auth, and Firestore**.
It enables authenticated users to manage products with role-based access control, analytics, and a clean, scalable architecture.

---

## 🚀 Live Demo

* URL: https://your-app.vercel.app

---

## 📦 Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
* **Backend:** Next.js API Routes (Node.js)
* **Database:** Firebase Firestore
* **Authentication:** Firebase Authentication
* **Hosting:** Vercel

---

## 🔐 Authentication & Authorization

* Firebase Authentication (Email/Password)
* Secure token-based authentication using Firebase ID tokens
* Backend verifies tokens via Firebase Admin SDK
* Role-based access control:

  * **Admin** → full CRUD access
  * **Viewer** → read-only access
* Server-side enforcement

### Security Decisions

* No sensitive data in URLs
* Authorization handled in API layer
* Tokens stored client-side and sent via `Authorization` header
* All protected routes validate user identity and role

---

## 🧱 Architecture Overview

The project follows a **layered architecture**:

```
Client (React UI)
   ↓
API Routes (Next.js)
   ↓
Service Layer (business logic)
   ↓
Repository Layer (Firestore access)
   ↓
Firebase Firestore
```

### Key Principles

* Separation of concerns
* Reusable components
* Clear data flow
* Backend-driven security

---

## 🛠 Features

### Core Features

* ✅ Authentication (Login / Signup)
* ✅ Role-based authorization (admin / viewer)
* ✅ Product CRUD (Create, Read, Update, Delete)
* ✅ Dashboard with metrics:

  * Total products
  * Active products
  * Total revenue

---

### Dashboard Enhancements

* 🔍 Search (by product name)
* 🎯 Filter (active / inactive)
* 📄 Pagination (first / prev / next / last)
* 🧩 Component-based UI (MetricsCards, ProductTable, ProductForm)

---

## 📊 Database Schema

### Collection: `users`

| Field       | Type      | Description             |
| ----------- | --------- | ----------------------- |
| uid (docId) | string    | Firebase Auth UID       |
| role        | string    | "admin" or "viewer"     |
| createdAt   | timestamp | User creation timestamp |

---

### Collection: `products`

| Field     | Type      | Description           |
| --------- | --------- | --------------------- |
| id        | string    | Document ID           |
| name      | string    | Product name          |
| category  | string    | Product category      |
| price     | number    | Product price         |
| status    | string    | "active" / "inactive" |
| createdAt | timestamp | Creation timestamp    |
| updatedAt | timestamp | Last update timestamp |

---

## ⚡ Indexing Strategy

To support filtering and scalability:

* Index on `status` → for filtering active/inactive products
* Index on `createdAt` → for sorting / pagination
* Future composite indexes:

  * `category + status`
  * `createdAt + userId` (multi-tenant scaling)

---

## 📈 Scalability Considerations

If scaling to 10× users/products:

* Use **cursor-based pagination** instead of client-side slicing
* Add `userId` to products for **multi-tenancy**
* Implement Firestore query limits (`limit`, `startAfter`)
* Introduce caching layer (e.g., Redis or edge caching)
* Move heavy logic into dedicated backend services

---

## 🧠 Trade-offs & Decisions

* Used **client-side pagination** for simplicity (can upgrade to cursor-based)
* Used `prompt()` for edit UI to prioritize backend correctness over UI complexity
* Minimal styling to focus on functionality and clarity
* Auto-create users in Firestore on first request (lazy provisioning)

---

## 🔮 What’s Next (If Given More Time)

* Server-side pagination (Firestore cursors)
* Sorting (price, date, category)
* Improved UI (modals, better form UX)
* Unit & integration tests
* CI/CD pipeline (GitHub Actions)
* Observability (logging, monitoring)
* Multi-tenant support

---

## 🤖 AI Tool Usage

AI tools (ChatGPT) were used to:

* Accelerate development and debugging
* Validate architectural decisions
* Improve code structure and readability

All generated code was reviewed, understood, and adapted.

---

## 🧪 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

---

### 4. Run the app

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 📌 Final Notes

This project demonstrates:

* Full-stack development capability
* Secure authentication & authorization
* Scalable backend architecture
* Clean frontend structure
* Real-world SaaS design patterns

---
