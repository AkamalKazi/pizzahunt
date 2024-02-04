import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/MongoConnect";
import mongoose from "mongoose";
import { User } from "@/app/models/User";

const bcrypt = require("bcryptjs");

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const { email, password } = credentials;
        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordMatch =
          (await user) && bcrypt.compareSync(password, user.password);
        console.log(passwordMatch);

        if (passwordMatch) {
          console.log("Authentication successful:", user);
          return user;
        } else {
          console.log("Authentication failed");
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 20 * 24 * 60 * 60, // Set the maxAge to 20 days in seconds
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
