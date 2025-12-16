# 🎟️ EventPlatform - Full Stack MERN Application

A full-stack event management platform where users can browse, create, and RSVP to events. This project demonstrates complex state management, authentication, and backend concurrency handling to prevent overbooking.

## 🚀 Features

* **User Authentication:** Secure Login/Registration using JWT (JSON Web Tokens) & Bcrypt.
* **Event Management:** Users can create events with details like date, location, capacity, and images.
* **RSVP System:** Users can join/leave events.
* **Dashboard:** Personalized view showing "Events I'm Organizing" and "Events I'm Attending".
* **Capacity Enforcement:** Strict backend logic prevents more attendees than the allowed capacity.
* **Concurrency Handling:** Atomic database updates prevent race conditions during simultaneous RSVPs.
* **Responsive UI:** Clean, modern interface built with React.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), React Router DOM, Axios, CSS Modules.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Atlas), Mongoose.
* **Authentication:** JWT (Stateless), Bcrypt.js.
* **Tools:** Nodemon, Dotenv, VS Code.

---

## ⚙️ Local Setup Instructions

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/MERN-Event-Platform.git](https://github.com/YOUR_USERNAME/MERN-Event-Platform.git)
cd MERN-Event-Platform
```

### 2. Backend Setup

Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder with the following credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Start the backend server:

```bash
npm run dev
```
### 3. Frontend Setup

Open a new terminal, navigate to the `client` folder, and install dependencies:

```bash
cd client
npm install
```

You should see the following messages in the terminal:

Server running on port 5000
MongoDB Connected Successfully


Start the React application:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 🧠 Technical Challenge: Handling Concurrency

One of the core requirements was to prevent **overbooking (race conditions)** when multiple users try to RSVP to the last available spot simultaneously.

### The Problem

A standard **Read → Check → Write** approach in Node.js is vulnerable to race conditions:

1. User A reads DB: Capacity 50, Attendees 49. (Allowed)

2. User B reads DB: Capacity 50, Attendees 49. (Allowed)

3. User A updates: Attendees 50.

4. User B updates: Attendees 51. (Overbooked!)



### The Solution (Atomic Updates)

This was solved by pushing the validation logic down to the **database layer** using MongoDB’s atomic operations with `findOneAndUpdate` and a conditional query.


## 📡 API Endpoints

| Method | Endpoint                          | Description                                   | Access                     |
|-------:|-----------------------------------|-----------------------------------------------|----------------------------|
| POST   | `/api/auth/register`              | Register a new user                            | Public                     |
| POST   | `/api/auth/login`                 | Login user & get JWT token                    | Public                     |
| GET    | `/api/events`                     | Get all events                                | Public                     |
| GET    | `/api/events/:id`                 | Get single event details                      | Public                     |
| POST   | `/api/events`                     | Create a new event                            | Private                    |
| POST   | `/api/events/:id/rsvp`            | Join or leave an event                        | Private                    |
| GET    | `/api/events/user/dashboard`      | Get user's organized & joined events          | Private                    |
| DELETE | `/api/events/:id`                 | Delete an event                               | Private (Organizer only)   |
