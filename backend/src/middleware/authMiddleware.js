import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(request, response, next) {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return response.status(401).json({ message: "Please log in first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return response.status(401).json({ message: "User account not found" });
    }

    request.user = user;
    next();
  } catch {
    response.status(401).json({ message: "Invalid or expired login session" });
  }
}

export function requireRole(role) {
  return (request, response, next) => {
    if (request.user.role !== role) {
      return response.status(403).json({ message: "You do not have access to this area" });
    }
    next();
  };
}
