// controllers/authController.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT Token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    secretKey,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const user = await prisma.user.create({
    data: { email, password },
  });

  res.status(201).json(user);
};

module.exports = { login, signup };
