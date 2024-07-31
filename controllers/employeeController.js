import AuditTrail from "../models/auditTrailModel.js";
import Employee from "../models/employeeModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createEmployee = catchAsync(async (req, res) => {
  const { name, address, age, department, status } = req.body;

  const newEmployee = await Employee.create({
    name,
    address,
    age,
    department,
    status,
  });

  res.status(201).json({
    status: "success",
    newEmployee,
  });
});

export const updateEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new AppError("Employee not found", 404));
  }

  const { __v, ...previousData } = employee.toObject();

  //update the employee fields
  Object.assign(employee, req.body);

  await employee.save();

  const auditEntry = await AuditTrail({
    employeeId: employee._id,
    previousData,
    newData: req.body,
  });

  //save the audit trail entry
  await auditEntry.save();

  res.status(200).json({
    status: "Success",
    employee,
  });
});

export const getAllEmployees = catchAsync(async (req, res) => {
  let limit = 3;

  const employees = await Employee.find();
  const auditTrial = await AuditTrail.find();

  res.status(200).json({
    status: "Sucees",
    employees,
    auditTrial,
  });
});

export const deleteEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) {
    return next(new AppError("No employee found with this id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getDashboardData = catchAsync(async (req, res) => {
  const aggregation = await Employee.aggregate([
    {
      $group: {
        _id: "$department",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        label: "$_id",
        value: "$count",
      },
    },
  ]);

  res.status(200).json({
    status: "Suceess",
    data: aggregation,
  });
});
