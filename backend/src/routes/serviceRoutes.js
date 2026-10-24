import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

router.get("/", async (_request, response, next) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    response.json(services);
  } catch (error) {
    next(error);
  }
});

export default router;
