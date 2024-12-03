const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Helper function to hash passwords (using SHA256 as an example)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Endpoint to create a movie
app.post('/movies', async (req, res) => {
  const { title, description, releaseDate, duration, genre, rating } = req.body;

  // Validation: Check if all required fields are present
  if (!title || !description || !releaseDate || !rating || !genre || !duration) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validate that duration is a number
  if (isNaN(duration)) {
    return res.status(400).json({ error: "Duration must be a number" });
  }

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        releaseDate: new Date(releaseDate),
        duration: parseInt(duration),
        genre,
        rating
      },
    });
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all movies
app.get('/movies', (req, res) => {
  const movies = [
    { id: 1, title: 'Movie 1', genre: 'Action', showtimes: ['10:00 AM', '1:00 PM', '4:00 PM'] },
    { id: 2, title: 'Movie 2', genre: 'Drama', showtimes: ['12:00 PM', '3:00 PM', '6:00 PM'] },
  ];
  res.json({ movies });
});

// Endpoint to create a showtime for a movie
app.post('/showtimes', async (req, res) => {
  const { movieId, startTime, endTime } = req.body;

  // Validate required fields
  if (!movieId || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const showtime = await prisma.showtime.create({
      data: {
        movieId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
    res.status(201).json(showtime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to create a user (signup)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Validation: Check if all required fields are present
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Hash the password
  const hashedPassword = hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,  // Store hashed password
      },
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all showtimes
app.get('/showtimes', async (req, res) => {
  try {
    const showtimes = await prisma.showtime.findMany({
      include: { movie: true }  // Include movie details
    });
    res.status(200).json(showtimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Booking endpoint
app.post('/bookings', async (req, res) => {
  try {
    const { userId, movieId, screenId, showTime, seatCount, totalCost } = req.body;

    // Create a booking for the user
    const booking = await prisma.booking.create({
      data: {
        userId,
        movieId,
        screenId,
        showTime: new Date(showTime),
        seatCount,
        totalCost,
        status: 'confirmed' // You can change this based on your logic
      }
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Signup route (new user)
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
  
    res.status(200).json({ message: 'Login successful', token });
  });
  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
