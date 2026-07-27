//////////////////////////////////////////////////////////////
// NATIONPATH AUTH CONFIG
//
// Handles:
// - NextAuth
// - Mongo Credentials Login
// - Google Login
// - JWT Helpers
//////////////////////////////////////////////////////////////

import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import type {
  NextAuthOptions
} from "next-auth";

import bcrypt from "bcryptjs";

import dbConnect from "@/lib/mongodb";
import User from "@/app/models/User";



const JWT_SECRET =
  process.env.JWT_SECRET ||
  "supersecretkey";





// Existing JWT Support

export function signToken(payload:any){

  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn:"7d",
    }
  );

}



export function verifyToken(token:string){

  try{

    return jwt.verify(
      token,
      JWT_SECRET
    );

  }
  catch{

    return null;

  }

}





// NextAuth

export const authOptions: NextAuthOptions = {


providers:[



//////////////////////////////////////////////////////////////
// EMAIL PASSWORD LOGIN
//////////////////////////////////////////////////////////////

CredentialsProvider({

name:"credentials",


credentials:{
 email:{},
 password:{},
},



async authorize(credentials){


await dbConnect();



const user = await User.findOne({

email: credentials?.email,

});



if(!user){

throw new Error("User not found");

}




const validPassword =
await bcrypt.compare(

credentials?.password || "",

user.password

);



if(!validPassword){

throw new Error("Invalid password");

}



return {

id:user._id.toString(),

name:user.name,

email:user.email,

role:user.role,

};

}


}),







//////////////////////////////////////////////////////////////
// GOOGLE LOGIN
//////////////////////////////////////////////////////////////

GoogleProvider({

clientId:
process.env.GOOGLE_CLIENT_ID!,


clientSecret:
process.env.GOOGLE_CLIENT_SECRET!,


}),



],







session:{


strategy:"jwt",


},





secret:
process.env.NEXTAUTH_SECRET,





pages:{


signIn:"/login",


},








callbacks:{





//////////////////////////////////////////////////////////////
// CREATE / SYNC GOOGLE USER
//////////////////////////////////////////////////////////////

async signIn({user, account}){


if(account?.provider === "google"){


await dbConnect();



let existingUser =
await User.findOne({

email:user.email,

});




if(!existingUser){


existingUser =
await User.create({

name:user.name || "Google User",

email:user.email,

avatar:user.image || null,

role:"user",

status:"active",

});


}



(user as any).id =
existingUser._id.toString();



(user as any).role =
existingUser.role;



}



return true;


},








//////////////////////////////////////////////////////////////
// JWT
//////////////////////////////////////////////////////////////

async jwt({
token,
user
}){


if(user){


token.id =
(user as any).id;


token.role =
(user as any).role;


}



return token;


},







//////////////////////////////////////////////////////////////
// SESSION
//////////////////////////////////////////////////////////////

async session({
session,
token
}){


if(session.user){


session.user.id =
token.id as string;



session.user.role =
token.role as string;



}



return session;


},



},



};