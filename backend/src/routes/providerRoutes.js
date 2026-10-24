import express from "express";
import Provider from "../models/Provider.js";

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const filter = request.query.service ? { service: request.query.service } : {};
    const providers = await Provider.find(filter).sort({ rating: -1, name: 1 });
    response.json(providers);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const provider = await Provider.findById(request.params.id);
    if (!provider) {
      return response.status(404).json({ message: "Provider not found" });
    }
    response.json(provider);
  } catch (error) {
    next(error);
  }
});

export default router;
