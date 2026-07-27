import { getServerSession } from "next-auth";
import { authOptions } 
from "@/lib/auth";

import User from "@/app/models/User";
import dbConnect from "@/lib/mongodb";



export async function getCurrentUser() {


  try {


    await dbConnect();




    const session =
      await getServerSession(
        authOptions
      );



    if (
      !session?.user?.email
    ) {

      console.log(
        "NO NEXTAUTH SESSION"
      );

      return null;

    }





    const email =
      session.user.email
      .toLowerCase()
      .trim();






    const user =
      await User.findOne({

        email: {
          $regex:
          new RegExp(
            `^${email}$`,
            "i"
          )
        }

      });






    if(!user){

      console.log(
        "USER NOT FOUND:",
        email
      );

      return null;

    }





    if(
      user.status === "blocked"
    ){

      console.log(
        "USER BLOCKED:",
        email
      );

      return null;

    }





    return user;



  } catch(error){


    console.error(
      "CURRENT USER ERROR:",
      error
    );


    return null;


  }


}