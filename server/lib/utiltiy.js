import jwt from "jsonwebtoken";

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createToken = (user, cookieExperiesIn) => {
  const token = signToken(user._id);

  const cookieOption = {
    expires: new Date(Date.now() + cookieExperiesIn),
  };

  if (process.env.NODE_ENV === "production") cookieOption.secure = true;

  return { token, cookieOption };
};

export { signToken, createToken };
