import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./db.js";
import { providers, services } from "./data.js";
import Provider from "./models/Provider.js";
import Service from "./models/Service.js";

await connectDatabase();
await Service.deleteMany({});
await Provider.deleteMany({});
await Service.insertMany(services);
await Provider.insertMany(providers);
console.log("Sample services and providers inserted");
await mongoose.disconnect();
