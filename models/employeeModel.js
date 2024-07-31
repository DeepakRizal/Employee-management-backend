import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Remote Location", "Contract Employee", "Full-Time"],
  },
});

const Employee =
  mongoose.model.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;
