const { PrismaClient } = require("@prisma/client"); // Prisma client
const prisma = new PrismaClient(); // Initialize Prisma client

// Connect to the database
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = { connectDB, prisma };
