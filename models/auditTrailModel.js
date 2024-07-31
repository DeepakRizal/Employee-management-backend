import mongoose from "mongoose";

const AuditTrailSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  previousData: {
    type: Object,
    required: true,
  },
  newData: {
    type: Object,
    required: true,
  },
  chnagedAt: {
    type: Date,
    default: Date.now,
  },
});

const AuditTrail =
  mongoose.model.AuditTrail || mongoose.model("AuditTrial", AuditTrailSchema);

export default AuditTrail;
