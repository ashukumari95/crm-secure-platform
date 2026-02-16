# 🚀 RBAC (CRM) Platform

![Banner](https://via.placeholder.com/1000x300?text=Growth+CRM+Platform+Banner)

> **A powerful, secure, and scalable Customer Relationship Management (CRM) system built with the MERN Stack.** > *Designed to streamline business operations, manage projects, and handle team workflows with Role-Based Access Control (RBAC).*

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

---

## 🌟 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 📖 About the Project

**Growth CRM** is a comprehensive solution for businesses to manage their clients, projects, and employees in one place. Unlike simple dashboards, this platform features a robust **Security Architecture** with strictly separated **Admin** and **Employee** nodes.

Whether you are assigning tasks, tracking project budgets, or sending automated emails, Growth CRM handles it all with a seamless UI and a powerful backend.

---

## ✨ Key Features

### 🛡️ **Role-Based Access Control (RBAC)**
- **Admin Root:** Full control over the system. Can create/delete users, assign projects, view financial stats, and manage settings.
- **Staff Node:** Limited access. Employees can only view their assigned tasks and update status/technical details. Critical data (Budget, Deadlines) remains locked.

### 💼 **Project Management**
- create, read, update, and delete (CRUD) projects.
- visual status tracking (Pending, Running, Completed).
- **Interactive Charts:** Data visualization for project distribution.

### 📧 **Communication & Media**
- **Automated Emails:** Integrated with **Nodemailer** for system alerts.
- **Image Uploads:** Profile picture management using **Cloudinary**.

### 🔒 **Security First**
- **JWT Authentication:** Secure login sessions with HTTP-only cookies.
- **Password Encryption:** BCrypt hashing for user data protection.
- **Protected Routes:** Middleware to prevent unauthorized access.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, Recharts |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **Authentication** | JSON Web Tokens (JWT), BCrypt |
| **Cloud Storage** | Cloudinary |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🚀 Live Demo

- **Frontend:** [https://crm-secure-platform.vercel.app](https://crm-secure-platform.vercel.app)
- **Backend API:** [https://growth-service-dashboard.onrender.com](https://growth-service-dashboard.onrender.com)

> **Test Credentials:**
> - **Admin:** `admin@crm.com` / `123`
> - **Employee:** `staff@crm.com` / `123`

---

## 📸 Screenshots

### 1. Admin Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Upload+Your+Dashboard+Screenshot+Here)

### 2. Secure Project Editing (RBAC in Action)
![Edit Project](https://via.placeholder.com/800x400?text=Upload+Edit+Project+Screenshot+Here)

### 3. Role-Based Login Portal
![Login](https://crm-secure-platform.vercel.app/800x400?text=Upload+Login+Page+Screenshot+Here)

---

## ⚡ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Account (Atlas or Local)
- Cloudinary Account
- Gmail Account (for Nodemailer)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/UniqueThinker-Rahul/growth-crm-platform.git](https://github.com/UniqueThinker-Rahul/growth-crm-platform.git)
    cd growth-crm-platform
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Set Up Environment Variables** (See below)

5.  **Run the Project**
    * **Backend:** `cd backend && npm start`
    * **Frontend:** `cd frontend && npm run dev`

---

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development

# Email Config
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
