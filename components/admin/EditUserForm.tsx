"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Save,
  Shield,
  UserCog,
  Lock,
  User,
} from "lucide-react";



export default function EditUserForm({

user,

currentUser,

}:any){


const router =
useRouter();


const [loading,setLoading] =
useState(false);



const isSuperAdmin =
currentUser.role === "superadmin";


const isAdmin =
currentUser.role === "admin";



const canManageRole =
isSuperAdmin || isAdmin;





const [form,setForm] =
useState({


avatar:
user.avatar || "",


name:
user.name || "",


role:
user.role || "user",


status:
user.status || "active",



profile:{


phone:
user.profile?.phone || "",


department:
user.profile?.department || "",


bio:
user.profile?.bio || "",


},




permissions:{


news:
user.permissions?.news || false,


astro:
user.permissions?.astro || false,


ads:
user.permissions?.ads || false,


revenue:
user.permissions?.revenue || false,


userManagement:
user.permissions?.userManagement || false,


},



});







const roles =

isSuperAdmin

?

[
"superadmin",
"admin",
"editor",
"reporter",
"advertiser",
"user"
]

:

[
"editor",
"reporter",
"advertiser",
"user"
];









function updateProfile(
key:string,
value:string
){

setForm({

...form,

profile:{

...form.profile,

[key]:value

}

});


}








function updatePermission(
key:string
){


setForm({

...form,


permissions:{


...form.permissions,


[key]:
!form.permissions[
key as keyof typeof form.permissions
]


}


});


}











async function handleSubmit(
e:any
){

e.preventDefault();


try{


setLoading(true);



const res =
await fetch(
`/api/users/${user._id}`,
{


method:"PUT",


headers:{


"Content-Type":
"application/json"


},


body:
JSON.stringify(form)


}

);





const data =
await res.json();





if(!res.ok){


alert(
data.error ||
"Update failed"
);


return;


}





router.push(
"/admin/users"
);


router.refresh();



}
catch(error){


console.error(
error
);


alert(
"Server error"
);


}
finally{


setLoading(false);


}


}









return (

<form

onSubmit={handleSubmit}

className="
space-y-8
max-w-4xl
"

>









<section

className="
bg-[#0e1726]
border
border-white/10
rounded-xl
p-6
space-y-4
"

>


<h2

className="
text-xl
font-bold
flex
items-center
gap-2
"

>

<User size={20}/>

Profile Information

</h2>








<input


value={form.avatar}


onChange={

e=>

setForm({

...form,

avatar:e.target.value

})

}


placeholder="Avatar URL"


className="input"

/>








<input


value={form.name}


onChange={

e=>

setForm({

...form,

name:e.target.value

})

}


placeholder="Full Name"


className="input"

/>








<input


value={user.email}


disabled


className="
input
opacity-50
"

/>










<input


value={form.profile.phone}


onChange={

e=>

updateProfile(
"phone",
e.target.value
)

}


placeholder="Phone"


className="input"

/>









<input


value={form.profile.department}


onChange={

e=>

updateProfile(
"department",
e.target.value
)

}


placeholder="Department"


className="input"

/>









<textarea


value={form.profile.bio}


onChange={

e=>

updateProfile(
"bio",
e.target.value
)

}


placeholder="Bio"


className="
input
h-32
"

/>





</section>









<section

className="
bg-[#0e1726]
border
border-white/10
rounded-xl
p-6
space-y-4
"

>



<h2

className="
text-xl
font-bold
flex
items-center
gap-2
"

>


<UserCog size={20}/>


Account Settings


</h2>










<select


disabled={!canManageRole}


value={form.role}


onChange={

e=>

setForm({

...form,

role:e.target.value

})

}


className="input"


>


{

roles.map(role=>(


<option

key={role}

value={role}

>

{role}

</option>


))


}


</select>









<select


value={form.status}


onChange={

e=>

setForm({

...form,

status:e.target.value

})

}


className="input"


>


<option value="active">

Active

</option>


<option value="blocked">

Blocked

</option>


</select>



</section>









<section

className="
bg-[#0e1726]
border
border-white/10
rounded-xl
p-6
"

>



<h2

className="
text-xl
font-bold
mb-4
flex
items-center
gap-2
"

>


<Shield size={20}/>


Permissions


</h2>









{

Object.keys(
form.permissions
)
.map(permission=>(



<label


key={permission}


className="
flex
justify-between
items-center
py-3
border-b
border-white/10
"


>


<span className="capitalize">

{
permission
}

</span>






<input


type="checkbox"


disabled={!isSuperAdmin}


checked={

form.permissions[
permission as keyof typeof form.permissions
]

}


onChange={()=>
updatePermission(permission)
}


/>




</label>



))


}




</section>









<section

className="
bg-red-950/30
border
border-red-900/50
rounded-xl
p-6
"

>


<h2

className="
text-red-400
font-bold
flex
gap-2
items-center
"

>


<Lock size={18}/>


Security


</h2>




<p

className="
text-sm
text-gray-400
mt-2
"

>

Password reset is managed from User Management.

</p>


</section>









<button


disabled={loading}


className="
flex
items-center
gap-2
bg-orange-500
hover:bg-orange-600
disabled:opacity-50
px-6
py-3
rounded-xl
font-semibold
"


>


<Save size={18}/>


{

loading

?

"Updating..."

:

"Update User"

}


</button>






</form>

);


} 