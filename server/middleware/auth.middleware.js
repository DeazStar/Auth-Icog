import jwt from "jsonwebtoken";
import catchAsync from "../error/catchAsycn.error.js";
import User from "../models/user.model.js";
import AppError from "../error/AppError.error.js";

const authMiddleware = catchAsync(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  console.log(authHeader);
  let userId;

  if (!authHeader) return next(new AppError("Unautorized", 401));

  const token = authHeader.split(" ")[1];

  if (!token) return next(new AppError("Unautorized", 401));

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return next(new AppError("Token is not valid", 401));
    }
    userId = user.userId;
    const currrentUser = await User.findById(userId);
    req.user = currrentUser;

    return next();
  });
});

export default authMiddleware;
