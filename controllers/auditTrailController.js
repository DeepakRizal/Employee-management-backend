import Employee from "../models/employeeModel.js";
import AuditTrail from "../models/auditTrailModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getEmployeeWithAuditTrail = catchAsync(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return new AppError("Employee not found", 404);
  }

  const auditTrial = await AuditTrail.find({
    employeeId: req.params.id,
  });

  res.status(200).json({
    status: "Success",
    employee,
    auditTrial,
  });
});
