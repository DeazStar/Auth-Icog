import catchAsync from "../error/catchAsycn.error.js";
import { createToken } from "../lib/utiltiy.js";

import User from "../models/user.model.js";

export const signup = catchAsync(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  //validating if the fullName, email or password has been sent or not empty
  //will be validated by mongoose and catch error using catchAsync function
  const user = await User.create({
    fullName,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("email and password are required", 400));

  const user = await User.findOne({ email });

  if (!user || !(await user.checkPassword(password)))
    return next(new AppError("incorrect email or password", 401));

  const expiresIn = process.env.ACCESS_COOKIE_EXPIRES_IN * 60 * 1000;
  //TODO: figure out if we have to send the refresh token when login
  const { accessToken, cookieOption } = createToken(user, expiresIn);

  res.cookie("token", accessToken, cookieOption);
  res.status(200).json({
    status: "success",
    data: {
      fullName: user.fullName,
      email: user.email,
    },
  });
});
