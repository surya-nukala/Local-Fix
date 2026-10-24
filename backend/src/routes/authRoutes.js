import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

function createToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

router.post("/register", async (request, response, next) => {
  try {
    const { name, email, password, role } = request.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).json({ message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
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
    const { email, password, role } = request.body;
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
