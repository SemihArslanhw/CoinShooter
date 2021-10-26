import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import { db } from "../../../components/firebase/firebase";


export default NextAuth({
  providers:[
     Providers.Google({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET

     }),
     Providers.Email({
       server:{
         host: process.env.EMAIL_SERVER_HOST,
         port: process.env.EMAIL_SERVER_PORT,
         auth:{
           user: process.env.EMAIL_SERVER_USER,
           pass: process.env.EMAIL_SERVER_PASSWORD,
         },
       },
       from: process.env.EMAIL_FROM,
     })
     
  ],
  pages: {
    signIn: "/signin",
  },
  adapter: FirebaseAdapter(db),

})
