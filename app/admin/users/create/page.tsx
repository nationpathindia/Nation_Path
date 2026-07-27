import User from "@/app/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";


const ALLOWED_ROLES = [
  "admin",
  "editor",
  "reporter",
  "advertiser",
  "user",
];



export default function CreateUserPage() {



  async function createUser(formData: FormData) {

    "use server";


    try {


      await dbConnect();



      const name =
        String(
          formData.get("name") || ""
        )
        .trim();



      const email =
        String(
          formData.get("email") || ""
        )
        .toLowerCase()
        .trim();



      const password =
        String(
          formData.get("password") || ""
        );



      const role =
        String(
          formData.get("role") || "user"
        );





      if(
        !name ||
        !email ||
        !password
      ){

        throw new Error(
          "All fields are required"
        );

      }





      if(password.length < 6){

        throw new Error(
          "Password must contain minimum 6 characters"
        );

      }





      if(
        !ALLOWED_ROLES.includes(role)
      ){

        throw new Error(
          "Invalid user role"
        );

      }





      const existingUser =
        await User.findOne({
          email,
        });




      if(existingUser){

        throw new Error(
          "User with this email already exists"
        );

      }





      const hashedPassword =
        await bcrypt.hash(
          password,
          12
        );






      await User.create({

        name,

        email,

        password: hashedPassword,


        provider:
          "credentials",


        role,


        status:
          "active",


      });





      redirect(
        "/admin/users"
      );



    }
    catch(error){


      console.error(
        "CREATE USER ERROR:",
        error
      );


      throw error;


    }



  }





  return (

    <div
      className="
      max-w-xl
      space-y-8
      text-white
      "
    >



      <div>

        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Create User
        </h1>


        <p
          className="
          text-gray-400
          mt-2
          "
        >
          Create newsroom team members and subscribers.
        </p>


      </div>





      <form
        action={createUser}
        className="
        space-y-5
        bg-[#0e1726]
        border
        border-white/10
        rounded-2xl
        p-6
        "
      >





        <div>

          <label className="text-sm text-gray-400">
            Full Name
          </label>


          <input
            name="name"
            required
            placeholder="Enter full name"
            className="
            mt-2
            w-full
            p-3
            rounded-xl
            bg-black/30
            border
            border-white/10
            text-white
            outline-none
            focus:border-[#EA661B]
            "
          />

        </div>







        <div>

          <label className="text-sm text-gray-400">
            Email
          </label>


          <input

            name="email"

            type="email"

            required

            placeholder="Enter email address"

            className="
            mt-2
            w-full
            p-3
            rounded-xl
            bg-black/30
            border
            border-white/10
            text-white
            outline-none
            focus:border-[#EA661B]
            "

          />


        </div>







        <div>

          <label className="text-sm text-gray-400">
            Password
          </label>


          <input

            name="password"

            type="password"

            required

            placeholder="Minimum 6 characters"

            className="
            mt-2
            w-full
            p-3
            rounded-xl
            bg-black/30
            border
            border-white/10
            text-white
            outline-none
            focus:border-[#EA661B]
            "

          />


        </div>







        <div>

          <label className="text-sm text-gray-400">
            Role
          </label>


          <select

            name="role"

            defaultValue="user"

            className="
            mt-2
            w-full
            p-3
            rounded-xl
            bg-black/30
            border
            border-white/10
            text-white
            outline-none
            "

          >


            <option value="admin">
              Admin
            </option>


            <option value="editor">
              Editor
            </option>


            <option value="reporter">
              Reporter
            </option>


            <option value="advertiser">
              Advertiser
            </option>


            <option value="user">
              Subscriber
            </option>


          </select>


        </div>







        <button

          type="submit"

          className="
          w-full
          py-3
          rounded-xl
          bg-[#EA661B]
          hover:bg-orange-600
          font-semibold
          transition
          "

        >

          Create User

        </button>




      </form>



    </div>

  );


}