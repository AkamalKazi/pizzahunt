import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";
import { User } from "@/app/models/User.js";
import { UserInfos } from "@/app/models/UserInfos.js";
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);

  const data = await req.json();
  const { name, image, ...otherUserInfo } = data;

  const email = session.user.email;

  if (data != null) {
    await User.updateOne({ email }, data);
    await UserInfos.findOneAndUpdate({ email }, otherUserInfo, {
      upsert: true,
    });
  } else {
  }

  return Response.json(true);
}

export async function GET(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }

  const userData = await User.findOne({ email }).lean();
  const userInfo = await UserInfos.findOne({ email }).lean();
  console.log(userData);
  return Response.json({ ...userData, ...userInfo });
}
