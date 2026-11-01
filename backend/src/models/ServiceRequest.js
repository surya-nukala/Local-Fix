import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: String, required: true, trim: true, maxlength: 150 },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
    service: { type: String, required: true, trim: true, maxlength: 100 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    preferredDate: { type: String, required: true, trim: true, maxlength: 30 },
    preferredTime: { type: String, required: true, trim: true, maxlength: 30 },
    notes: { type: String, default: "", trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", serviceRequestSchema);
