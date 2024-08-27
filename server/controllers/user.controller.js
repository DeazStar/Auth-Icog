import catchAsync from "../error/catchAsycn.error.js";
import AppError from "../error/AppError.error.js";
import User from "../models/user.model.js";

const getProfile = catchAsync(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    data: {
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    },
  });
});

const updateProfile = catchAsync(async (req, res, next) => {
  const { fullName, email } = req.body;
  const user = req.user;

  if (!fullName || !email)
    return next(new AppError("All fileds are required", 400));

  const newUser = await User.findByIdAndUpdate(
    user._id,
    {
      fullName,
      email,
    },
    {
      new: true,
    },
  );

  res.status(200).json({
    status: "success",
    data: {
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
      },
    },
  });
});

export { getProfile, updateProfile };
