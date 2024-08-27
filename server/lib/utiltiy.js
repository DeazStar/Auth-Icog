import jwt from "jsonwebtoken";

const createToken = (userId, secret, expiresIn) => {
  const token = jwt.sign({ userId: userId }, secret, {
    expiresIn: expiresIn,
  });

  return token;
};

export { createToken };
