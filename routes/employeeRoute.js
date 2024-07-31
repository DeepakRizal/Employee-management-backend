import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
  getDashboardData,
} from "../controllers/employeeController.js";
import { getEmployeeWithAuditTrail } from "../controllers/auditTrailController.js";
import { protect } from "../controllers/auth.js";

const router = express.Router();

//routes
router.get("/", protect, getAllEmployees);
router.post("/", protect, createEmployee);
router.put("/:id", protect, updateEmployee);
router.delete("/:id", protect, deleteEmployee);
router.get("/audittrial/:id", protect, getEmployeeWithAuditTrail);
router.get("/dashboard", protect, getDashboardData);

export default router;
