import { model, Schema, models } from "mongoose";

const UserInfosSchema = new Schema(
  {
    email: { type: String, required: true },
    streetAddress: { type: String },
    postalCode: { type: String },
    City: { type: String },
    Country: { type: String },
    phone: { type: String },
    IsAdmin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserInfos =
  models?.userInfos || model("userInfos", UserInfosSchema);
