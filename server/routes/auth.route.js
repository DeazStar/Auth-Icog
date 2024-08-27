import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  signup,
  login,
  oauthSignin,
  refreshToken,
} from "../controllers/auth.controller.js";

dotenv.config();

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/refresh").post(refreshToken);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/oauth/redirect/google",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);

router.route("/oauth/google").get(passport.authenticate("google"));

router.route("/oauth/redirect/google").get(
  passport.authenticate("google", {
    session: false,
  }),
  (req, res, next) => {
    oauthSignin(req, res, next);
  },
);
export default router;
