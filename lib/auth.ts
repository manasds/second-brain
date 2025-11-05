import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {client} from "./prisma"
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(client, {
    provider: "postgresql",
  }),
  socialProviders : {
    google :{
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI : "http://localhost:3000/api/auth/callback/google"
    },
  } ,
  debug: true,
});

export type Auth = typeof auth;