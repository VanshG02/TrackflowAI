# TrackflowAI — Full-Stack Personal Finance & Expense Intelligence Platform  
### (React + Node.js + Express + MongoDB + JWT + AI Insights)

## 📌 Overview  
TrackflowAI is a full-stack expense tracking and AI-powered financial insights platform.  
It provides secure authentication, cloud-hosted data storage, visual dashboards, and optional AI-generated spending analysis.

---

## 🏗 Project Architecture

### 1. Frontend (Dashboard UI)
**Tech:** React.js, Vite, Axios, Tailwind CSS, Recharts  
**Folder:** `/frontend`

The frontend provides an intuitive user interface that allows users to:

- Register & log in securely  
- Add and manage expenses  
- View dynamic charts (monthly/category spend)  
- Generate AI-powered insights  


---

### 2. Backend API (Server)
**Tech:** Node.js, Express.js, JWT, MongoDB Atlas, OpenAI SDK  
**Folder:** `/backend`

Responsibilities:

- Authentication (login/register)  
- Expense creation & retrieval  
- JWT-based route protection  
- AI insights processing  
- MongoDB persistence  

---

### 3. Database — MongoDB Atlas
**Tech:** MongoDB (NoSQL)

MongoDB Atlas stores:

- User accounts  
- Expense entries (amount, category, date, description)

Benefits:

- Cloud-hosted  
- Scalable  
- Automatic backups  
- IP-based access control  

---

### 4. Authentication Service (JWT)
**Location:** `/backend/controllers/authController.js`

Handles:

- Password hashing via bcrypt  
- Issuing signed JWT tokens  
- Saving minimal session state on server  
- Protecting routes using middleware  

JWT enables **stateless authentication**, ideal for scalable apps.

---

### 5. Expense Service
**Location:** `/backend/controllers/expenseController.js`

Responsible for:

- Adding new expenses  
- Fetching expenses tied to logged-in user  
- Sorting and structuring data for dashboards  

Each expense contains:

{
amount,
category,
description,
date,
userId
}


---

### 6. AI Insights Engine (Optional)
**Location:** `/backend/controllers/aiController.js`  
**Model:** OpenAI (gpt-4o-mini or similar)

Provides:

- Spending analysis  
- Advice on saving  
- Category insights  
- Behavior pattern detection  

Flow:

1. Frontend sends expenses  
2. Backend creates prompt  
3. Model returns insights  
4. Dashboard shows results  

---

## 🔄 Application Flow

### 🔐 Authentication Flow
1. User signs up or logs in  
2. Frontend sends:
POST /api/auth/register
POST /api/auth/login
3. Server returns JWT  
4. Token stored in `localStorage`  
5. Every request includes:
Authorization: Bearer <token>

---

### 💸 Expense Management Flow

1. User adds an expense  
2. Frontend sends:
POST /api/expenses
3. Backend verifies JWT  
4. Expense saved to MongoDB  
5. Dashboard updates in real time  

---

### 🧠 AI Insights Flow

1. User clicks “Generate Insights”  
2. Frontend sends expenses list to:
POST /api/ai
3. Backend calls OpenAI  
4. Model returns insights  
5. UI displays formatted results  

---
## Snippets
<img width="1900" height="1050" alt="Landing Page" src="https://github.com/user-attachments/assets/2ab85adf-287e-4207-8e53-8a4101ab503e" />
<img width="1900" height="800" alt="Login Page" src="https://github.com/user-attachments/assets/c4333dd8-d732-4e41-9ca4-b94162fab3c3" />
<img width="1500" height="1000" alt="Register Page" src="https://github.com/user-attachments/assets/cdd2f3d8-f28d-4597-a971-49f41fb969fe" />
<img width="650" height="330" alt="Dashboard1" src="https://github.com/user-attachments/assets/ba2a46af-6ff3-4724-8b66-d83599257898" />
<img width="650" height="330" alt="dashboard2" src="https://github.com/user-attachments/assets/0a6f5936-3702-49c4-b34a-5921004036bd" />
<img width="650" height="330" alt="dash3" src="https://github.com/user-attachments/assets/72afe08a-dfb7-4191-89c6-d07033af4b7f" />
