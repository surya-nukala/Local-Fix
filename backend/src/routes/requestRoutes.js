import express from "express";
import ServiceRequest from "../models/ServiceRequest.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, requireRole("customer"), async (request, response, next) => {
  try {
    const serviceRequest = await ServiceRequest.create({
      ...request.body,
      customerId: request.user._id
    });
    response.status(201).json(serviceRequest);
  } catch (error) {
    next(error);
  }
});

router.get("/", requireAuth, async (request, response, next) => {
  try {
    const filter = request.user.role === "provider"
      ? { provider: request.user.name }
      : { customerId: request.user._id };
    const requests = await ServiceRequest.find(filter).sort({ createdAt: -1 });
    response.json(requests);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", requireAuth, requireRole("provider"), async (request, response, next) => {
  try {
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      request.params.id,
      { status: request.body.status },
      { new: true, runValidators: true }
    );

    if (!serviceRequest) {
      return response.status(404).json({ message: "Request not found" });
    }

    response.json(serviceRequest);
  } catch (error) {
    next(error);
  }
});

export default router;
