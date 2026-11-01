import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Provider from "../models/Provider.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function createToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

router.post("/register", async (request, response, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      service,
      experience,
      location
    } = request.body;
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return response.status(400).json({ message: "Name must be between 2 and 100 characters" });
    }
    if (typeof password !== "string" || password.length < 8 || password.length > 128) {
      return response.status(400).json({ message: "Password must be between 8 and 128 characters" });
    }
    if (!["customer", "provider"].includes(role)) {
      return response.status(400).json({ message: "Select a valid account role" });
    }
    if (role === "provider" && (!service || !experience || !location)) {
      return response.status(400).json({
        message: "Provider service, experience, and location are required"
      });
    }
    const normalizedEmail = normalizeEmail(email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return response.status(400).json({ message: "Enter a valid email address" });
    }
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return response.status(409).json({ message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashedPassword, role });
    if (role === "provider") {
      await Provider.create({
        userId: user._id,
        email: normalizedEmail,
        name: name.trim(),
        service,
        experience,
        location
      });
    }
    response.status(201).json({
      token: createToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (request, response, next) => {
  try {
    const { password, role } = request.body;
    const email = normalizeEmail(request.body.email);
    if (!email || typeof password !== "string") {
      return response.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    const passwordMatches = user && await bcrypt.compare(password, user.password);

    if (!passwordMatches || (role && user.role !== role)) {
      return response.status(401).json({ message: "Email or password is incorrect" });
    }

    response.json({
      token: createToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, (request, response) => {
  response.json(request.user);
});

export default router;
