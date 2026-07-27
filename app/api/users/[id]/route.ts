import { NextResponse } from "next/server";

import User from "@/app/models/User";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const dynamic = "force-dynamic";



/*
========================================
UPDATE USER
========================================
*/

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {

  try {


    const currentUser =
      await getCurrentUser();



    if (!currentUser) {

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }




    const targetUser =
      await User.findById(params.id);



    if (!targetUser) {

      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status:404,
        }
      );

    }




    const body =
      await req.json();



    const isSelf =
      currentUser._id.toString()
      ===
      targetUser._id.toString();






    /*
    ====================================
    SANITIZED UPDATE DATA
    ====================================
    */

const updateData:any = {

  name:
  body.name
  ??
  targetUser.name,


  avatar:
  body.avatar
  ??
  targetUser.avatar,


  status:
  body.status
  ??
  targetUser.status,


  profile:
  body.profile
  ??
  targetUser.profile,


  permissions:
  body.permissions
  ??
  targetUser.permissions,

};




    /*
    ====================================
    SUPERADMIN
    FULL POWER
    ====================================
    */


    if(
      currentUser.role === "superadmin"
    ){


      updateData.role =
      body.role
      ??
      targetUser.role;



      await User.findByIdAndUpdate(

        params.id,

        updateData,

        {
          new:true,
        }

      );



      return NextResponse.json({

        success:true,

        message:
        "User updated successfully",

      });


    }









    /*
    ====================================
    ADMIN
    ====================================
    */


    if(
      currentUser.role === "admin"
    ){



      /*
      Admin cannot edit superadmin
      */


      if(
        targetUser.role === "superadmin"
      ){

        return NextResponse.json(
          {
            error:
            "Cannot modify superadmin",
          },
          {
            status:403,
          }
        );

      }





      /*
      Admin cannot edit another admin
      */


      if(
        targetUser.role === "admin"
        &&
        !isSelf
      ){

        return NextResponse.json(
          {
            error:
            "Admin account protected",
          },
          {
            status:403,
          }
        );

      }




      /*
      Admin cannot promote admin
      */


      if(
        body.role === "admin"
      ){

        return NextResponse.json(
          {
            error:
            "Cannot assign admin role",
          },
          {
            status:403,
          }
        );

      }




      updateData.role =
      body.role
      ??
      targetUser.role;



      await User.findByIdAndUpdate(

        params.id,

        updateData,

        {
          new:true,
        }

      );



      return NextResponse.json({

        success:true,

        message:
        "User updated successfully",

      });


    }









    /*
    ====================================
    EDITOR
    ONLY REPORTER
    ====================================
    */


    if(
      currentUser.role === "editor"
    ){



      if(
        targetUser.role !== "reporter"
        &&
        !isSelf
      ){

        return NextResponse.json(
          {
            error:
            "Forbidden",
          },
          {
            status:403,
          }
        );

      }




      /*
      Editor cannot change roles
      */


      delete updateData.role;




      await User.findByIdAndUpdate(

        params.id,

        updateData,

        {
          new:true,
        }

      );



      return NextResponse.json({

        success:true,

        message:
        "Reporter updated successfully",

      });


    }









    /*
    ====================================
    NORMAL USER
    OWN PROFILE ONLY
    ====================================
    */


    if(
      isSelf
    ){


      delete updateData.role;

      delete updateData.permissions;



      await User.findByIdAndUpdate(

        params.id,

        updateData,

        {
          new:true,
        }

      );



      return NextResponse.json({

        success:true,

        message:
        "Profile updated successfully",

      });


    }








    return NextResponse.json(

      {
        error:
        "Forbidden",
      },

      {
        status:403,
      }

    );




  }
  catch(error){


    console.error(
      "UPDATE USER ERROR:",
      error
    );



    return NextResponse.json(

      {
        error:
        "Server error",
      },

      {
        status:500,
      }

    );


  }


}












/*
========================================
DELETE USER
========================================
*/


export async function DELETE(

req:Request,

{
params,
}:{
params:{
id:string;
}
}

){

try{


const currentUser =
await getCurrentUser();



if(!currentUser){

return NextResponse.json(
{
error:"Unauthorized",
},
{
status:401,
}
);

}





const targetUser =
await User.findById(params.id);




if(!targetUser){

return NextResponse.json(
{
error:"User not found",
},
{
status:404,
}
);

}





/*
Nobody can delete self
*/


if(
currentUser._id.toString()
===
targetUser._id.toString()
){

return NextResponse.json(
{
error:
"Cannot delete yourself",
},
{
status:403,
}
);

}







/*
SUPERADMIN
*/


if(
currentUser.role==="superadmin"
){


await User.findByIdAndDelete(
params.id
);



return NextResponse.json({

success:true,

message:
"User deleted",

});


}








/*
ADMIN
*/


if(
currentUser.role==="admin"
){


if(

targetUser.role==="superadmin"
||
targetUser.role==="admin"

){

return NextResponse.json(
{
error:
"Protected account",
},
{
status:403,
}
);

}




await User.findByIdAndDelete(
params.id
);



return NextResponse.json({

success:true,

message:
"User deleted",

});


}









/*
EDITOR
*/


if(
currentUser.role==="editor"
){



if(
targetUser.role!=="reporter"
){

return NextResponse.json(
{
error:
"Forbidden",
},
{
status:403,
}
);

}




await User.findByIdAndDelete(
params.id
);



return NextResponse.json({

success:true,

message:
"Reporter deleted",

});


}








return NextResponse.json(

{
error:
"Forbidden",
},

{
status:403,
}

);



}
catch(error){


console.error(
"DELETE USER ERROR:",
error
);



return NextResponse.json(

{
error:
"Server error",
},

{
status:500,
}

);


}


}