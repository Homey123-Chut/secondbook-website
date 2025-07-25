import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import fakeDataRoutes from "./routes/fakeDataRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { seedTestBooks } from "./scripts/seedTestBooks.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Database connection with retry logic
const createConnection = async () => {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 25060,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log("✅ Connected to MySQL database");
    return connection;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
};

// Comprehensive logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;
  
  // Log the incoming request
  console.log(`\n🌐 [${timestamp}] ${method} ${url}`);
  console.log(`📍 IP: ${ip}`);
  
  // Log request body for important operations (excluding sensitive data)
  if (req.body && Object.keys(req.body).length > 0) {
    const logBody = { ...req.body };
    // Hide sensitive information
    if (logBody.password) logBody.password = '***HIDDEN***';
    if (logBody.confirmPassword) logBody.confirmPassword = '***HIDDEN***';
    console.log(`📦 Request Body:`, logBody);
  }
  
  // Log specific activities
  if (url.includes('/login')) {
    console.log(`🔑 LOGIN ATTEMPT for user: ${req.body?.email || 'unknown'}`);
  } else if (url.includes('/signup') || url.includes('/register')) {
    console.log(`👤 SIGNUP ATTEMPT for user: ${req.body?.email || 'unknown'}`);
  } else if (url.includes('/cart')) {
    console.log(`🛒 CART OPERATION: ${method}`);
  } else if (url.includes('/books')) {
    console.log(`📚 BOOK OPERATION: ${method}`);
  } else if (url.includes('/profile')) {
    console.log(`👥 PROFILE OPERATION: ${method}`);
  }

  // Intercept the response to log it
  const originalSend = res.send;
  res.send = function(data) {
    const statusCode = res.statusCode;
    const statusEmoji = statusCode >= 400 ? '❌' : statusCode >= 300 ? '⚠️' : '✅';
    
    console.log(`${statusEmoji} Response: ${statusCode}`);
    
    // Log successful operations
    if (statusCode >= 200 && statusCode < 300) {
      if (url.includes('/login')) {
        console.log(`🎉 LOGIN SUCCESSFUL`);
      } else if (url.includes('/signup')) {
        console.log(`🎉 SIGNUP SUCCESSFUL`);
      } else if (url.includes('/cart') && method === 'POST') {
        console.log(`🎉 ITEM ADDED TO CART`);
      } else if (url.includes('/books') && method === 'POST') {
        console.log(`🎉 BOOK CREATED/UPDATED`);
      }
    } else if (statusCode >= 400) {
      console.log(`💥 ERROR DETAILS: ${data}`);
    }
    
    console.log(`⏱️ Request completed in: ${Date.now() - req.startTime}ms`);
    console.log('─'.repeat(50));
    
    originalSend.call(this, data);
  };

  // Track request start time
  req.startTime = Date.now();
  next();
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/users", userRoutes);
app.use("/api/fake", fakeDataRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Sync DB then start server
sequelize.sync({ alter: false }).then(async () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 PSA BOOK MARKETPLACE SERVER STARTED');
  console.log('='.repeat(60));
  console.log(`📅 Server started at: ${new Date().toISOString()}`);
  console.log(`🌐 Server running on: http://localhost:3000`);
  console.log(`🔗 Database: Connected and synced`);
  console.log(`📊 Monitoring: All activities logged`);
  
  // Seed test books if database is empty
  await seedTestBooks();
  
  console.log('='.repeat(60));
  console.log('📝 Activity Log:');
  console.log('─'.repeat(50));
  
  // Start the server
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is now listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('\n❌ Failed to sync database:', err);
  console.error('🔧 Please check your database configuration');
  process.exit(1);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server Error:", error);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});
