import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters"],
    // `select: false` will prevent the password from being returned in queries unless explicitly selected.
    select: false,
  },
  openId: {
    type: String,
  },
});

// Custom validation for the password field
userSchema.path("password").validate(function (value) {
  // If the authType is 'local', the password field is required
  if (this.openId) {
    return value && value.length >= 8;
  }
  // If the authType is 'oauth', the password is not required
  return true;
}, "Password is required");

userSchema.pre("save", async function (next) {
  if ((this.isModified("password") || this.isNew) && this.password) {
    try {
      this.password = await bcrypt.hash(this.password, 12);
    } catch (err) {
      next(err);
    }
  }
});

userSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
