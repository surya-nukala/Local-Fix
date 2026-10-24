import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, lowercase: true, trim: true },
    name: { type: String, required: true },
    service: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    verified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Provider", providerSchema);
