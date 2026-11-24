# 🚆 Smart Train Ticket Booking System

## 📌 Project Overview

The **Smart Train Ticket Booking System** is a full-stack web application developed to simplify train ticket booking and management. Users can log in, view available trains and compartment details, book seats, view their bookings, and cancel tickets.

The application uses HTML, CSS, and JavaScript for the frontend, Node.js and Express.js for the backend, and MySQL for database management.

## ✨ Features

- **User Login:** Users can log in with a username and password. New users are automatically registered on their first login.
- **Train Availability:** View available trains, source, destination, compartment types, and remaining seats.
- **Ticket Booking:** Select a train, choose a compartment type, and book the required number of seats.
- **Seat Management:** Available seat counts are updated after successful bookings.
- **Booking History:** View booking details, including booking ID, train information, compartment type, seats, and booking status.
- **Ticket Cancellation:** Cancel existing bookings and view their updated status.

## 🛠️ Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- MySQL Node.js Driver
- CORS

**Database**
- MySQL

## 📂 Project Structure

```text
Train-Ticket-Booking-System/
│
├── nikhil.html
├── nikhil1.css
├── nikhil2.js
│
└── backend/
    ├── server.js
    ├── dbniki.js
    └── package.json
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Folder

```bash
cd Train-Ticket-Booking-System
```

### 3. Install Dependencies

```bash
cd backend
npm install express mysql cors
```

### 4. Configure MySQL

Create a database named:

```sql
CREATE DATABASE trainbooking;
```

Create the required tables:
- users
- trains
- compartments
- bookings

Configure your MySQL connection details in `dbniki.js`.

### 5. Start the Backend Server

```bash
node server.js
```

The backend server runs at:

```text
http://localhost:5000
```

### 6. Run the Application

Open the application in your browser:

```text
http://localhost:5000
```

## 🔄 Application Workflow

1. Users enter their username and password to log in.
2. The backend checks the user credentials in the MySQL database.
3. If the user does not exist, a new user record is created.
4. Available trains and compartment details are retrieved from MySQL.
5. Users select a train and book the required seats.
6. Booking information is stored in the database.
7. Available seat counts are updated.
8. Users can view their bookings and cancel tickets.

## 🎯 Project Objective

To develop a database-driven train booking application demonstrating full-stack web development, REST API integration, CRUD operations, relational database management, and frontend-backend communication.
