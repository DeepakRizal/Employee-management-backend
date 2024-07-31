import express from "express";
import cors from "cors";
import employeeRouter from "./routes/employeeRoute.js";
import userRouter from "./routes/userRoutes.js";
import { globalErrorHandler } from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

// middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/employees", employeeRouter);
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
