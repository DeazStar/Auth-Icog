import jwt from "jsonwebtoken";
import catchAsync from "../error/catchAsycn.error.js";
import { createToken } from "../lib/utiltiy.js";
import AppError from "../error/AppError.error.js";
import User from "../models/user.model.js";
import validator from "validator";

export const signup = catchAsync(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  //catchAsync will catch any error thrown

  if (!fullName || !email || !password)
    return next(new AppError("All fileds are required", 400));

  if (password.length < 8)
    return next(new AppError("Password must have at least 8 characters"));

  if (!validator.isEmail(email)) return next(new AppError("Invalid Email"));
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

  let token = createToken(
    user._id,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN,
  );

  const accessToken = `Bearer ${token}`;

  token = createToken(
    user,
    process.env.REFRESH_SECRET,
    process.env.REFRESH_EXPIRES_IN,
  );

  const refreshToken = `refreshToken ${token}`;

  res.set({
    Authorization: accessToken,
    "X-Refresh-Token": refreshToken,
  });
  //res.cookie("token", accessToken, cookieOption);
  res.status(200).json({
    status: "success",
    data: {
      fullName: user.fullName,
      email: user.email,
    },
  });
});

export const refreshToken = catchAsync(async (req, res, next) => {
  const refreshHeader = req.headers["x-refresh-token"];
  const authHeader = req.headers["authorization"];
  let userId;

  if (!refreshHeader) return next(new AppError("Unautorized", 401));
  if (!authHeader) return next(new AppError("Unautorized", 401));

  const token = authHeader.split(" ")[1];
  const refreshToken = refreshHeader.split(" ")[1];

  if (!token) return next(new AppError("Unautorized", 401));

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, user) => {
    if (err) {
      return next(new AppError("Token is not valid", 401));
    }
    userId = user.userId;
  });

  const user = await User.findById(userId);

  if (!user) return next(new AppError("Unautorized", 401));

  const newToken = createToken(
    user._id,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN,
  );

  const accessToken = `Bearer ${newToken}`;

  res.set({
    Authorization: accessToken,
  });

  res.status(200).json({
    status: "success",
    message: "new access token granted!",
  });
});

export const oauthSignin = catchAsync(async (req, res, next) => {
  const user = req.user;

  const { familyName, givenName } = user.name;
  const email = user.emails[0].value;
  const profileId = req.user.id;

  const currentUser = await User.findOne({ openId: profileId });
  let userInfo, token;
  if (currentUser) {
    userInfo = currentUser;
  } else {
    const newUser = await User.create({
      fullName: `${givenName} ${familyName}`,
      email: email,
      openId: profileId,
    });

    userInfo = newUser;
  }

  token = createToken(
    userInfo._id,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN,
  );

  const accessToken = `Bearer ${token}`;

  token = createToken(
    userInfo._id,
    process.env.REFRESH_SECRET,
    process.env.JWT_EXPIRES_IN,
  );

  const refreshToken = `refreshToken ${token}`;
  const redirectUrl = `http://localhost:5173/redirect?accessToken=${accessToken}&refreshToken=${refreshToken}`;

  res.redirect(redirectUrl);
});
