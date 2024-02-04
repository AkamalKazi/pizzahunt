import mongoose from "mongoose";
import { MenuItems } from "../../models/MenuItems";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { data } = await req.json();
  console.log(data);
  const response = await MenuItems.create(data);
  return Response.json(response);
}
