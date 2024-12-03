# Movie Reservation App 🎥

A full-stack Movie Reservation application built using **React.js**, **Node.js**, and **PostgreSQL**. This app provides functionalities to manage movie listings, showtimes, bookings, and user authentication.

## Features 🌟
- **User Authentication**: Secure login and signup with JWT-based authentication.
- **Movie Management**: Add, update, delete, and view movie details.
- **Showtime Scheduling**: Manage movie showtimes for different screens.
- **Seat Reservation**: Book and manage seats for available showtimes.
- **Responsive Design**: Optimized for use on various devices.

---

## Tech Stack 🛠️

### Frontend:
- **React.js**
- **Axios** for API communication
- **CSS** for styling

### Backend:
- **Node.js** with **Express.js**
- **JWT** for authentication
- **Prisma ORM** for database interactions
- **PostgreSQL** as the database

---

## Installation 🚀

### Prerequisites:
- **Node.js** installed
- **PostgreSQL** database set up

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Atulshere18/Movie-Reservation.git

2.Navigate to the project directory:

bash
Copy code
cd Movie-Reservation

3.Install dependencies:

bash
Copy code
npm install
cd backend
npm install

4.Set up the database:

Configure your database connection in backend/prisma/schema.prisma.
Run migrations:
bash
Copy code
npx prisma migrate dev

5.Start the server:

bash
Copy code
cd backend
node index.js

6.Start the frontend:

bash
Copy code
cd ..
npm start


Usage ✨

Frontend: Navigate to http://localhost:3000 for the user interface.
Backend: API endpoints are accessible at http://localhost:5000.
API Routes:
POST /signup: User registration.
POST /login: User login and JWT token generation.
GET /movies: Fetch all movies.
POST /movies: Add a new movie (admin-only).
POST /showtimes: Add showtimes for a movie.
POST /bookings: Reserve seats for a show.

Future Enhancements 🚀
Payment Gateway Integration for online ticket bookings.
Admin Panel to manage movies and bookings.
Seat Selection for advanced booking preferences.
License 📝
This project is licensed under the MIT License.

Contributing 🤝
Contributions are welcome! Fork the repository and submit a pull request.

Contact 📬
Atul Manoj Shere

GitHub: Atulshere18
Email: atulshere18@gmail.com
css
Copy code

Feel free to update the content as per your project details!











