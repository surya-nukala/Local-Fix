import express from "express";
import mongoose from "mongoose";
import Provider from "../models/Provider.js";
import ServiceRequest from "../models/ServiceRequest.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, requireRole("customer"), async (request, response, next) => {
  try {
    const {
      provider,
      providerId,
      service,
      location,
      preferredDate,
      preferredTime,
      notes = ""
    } = request.body;
    if (![provider, service, location, preferredDate, preferredTime].every(
      (value) => typeof value === "string" && value.trim()
    )) {
      return response.status(400).json({
        message: "Provider, service, location, preferred date, and preferred time are required"
      });
    }
    const providerFilter = providerId && mongoose.isValidObjectId(providerId)
      ? { _id: providerId }
      : { name: provider.trim(), service: service.trim() };
    const providerRecord = await Provider.findOne(providerFilter);
    if (!providerRecord || providerRecord.name !== provider.trim() || providerRecord.service !== service.trim()) {
      return response.status(400).json({ message: "Selected provider was not found" });
    }
    const serviceRequest = await ServiceRequest.create({
      provider: provider.trim(),
      providerId: providerRecord._id,
      service: service.trim(),
      location: location.trim(),
      preferredDate: preferredDate.trim(),
      preferredTime: preferredTime.trim(),
      notes: typeof notes === "string" ? notes.trim() : "",
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
      ? {
          $or: [
            { providerId: request.user._id },
            { provider: request.user.name, providerId: { $exists: false } }
          ]
        }
      : { customerId: request.user._id };
    const requests = await ServiceRequest.find(filter).sort({ createdAt: -1 });
    response.json(requests);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", requireAuth, requireRole("provider"), async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ message: "Invalid request identifier" });
    }
    const allowedStatuses = ["Accepted", "Rejected", "Completed"];
    if (!allowedStatuses.includes(request.body.status)) {
      return response.status(400).json({ message: "Invalid request status" });
    }
    const provider = await Provider.findOne({ userId: request.user._id });
    if (!provider) {
      return response.status(403).json({ message: "Provider profile not found" });
    }
    const serviceRequest = await ServiceRequest.findOneAndUpdate(
      {
        _id: request.params.id,
        $or: [
          { providerId: provider._id },
          { provider: provider.name, providerId: { $exists: false } }
        ]
      },
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
