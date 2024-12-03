// routes/protectedRoutes.js
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Protected data accessed', user: req.user });
});

module.exports = router;
