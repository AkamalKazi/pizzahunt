import { model, Schema, models } from "mongoose";
const bcrypt = require("bcryptjs");
const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || !pass?.length < 5) {
          new Error("Password must be at least 5 characters");
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.post("validate", async function (user) {
  console.log(user.password);
  const notHashPassword = await user.password;
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(notHashPassword, salt);
  user.password = await hashPassword.toString();
});

export const User = models?.User || model("User", UserSchema);
