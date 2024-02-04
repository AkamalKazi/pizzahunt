import { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String, require: true },
    description: { type: String },
    basePrice: { type: Number },
  },
  { timestamps: true }
);

export const MenuItems =
  models?.MenuItems || model("MenuItems", MenuItemSchema);
