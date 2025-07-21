import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import fakeDataRoutes from "./routes/fakeDataRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { seedTestBooks } from "./scripts/seedTestBooks.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

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
  app.listen(3000, () => {
    console.log('✅ Server is now listening on port 3000');
  });
}).catch(err => {
  console.error('\n❌ Failed to sync database:', err);
  console.error('🔧 Please check your database configuration');
  process.exit(1);
});
