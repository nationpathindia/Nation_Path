"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Search,
  RefreshCcw,
  UserPlus,
  Trash2,
  KeyRound,
  ShieldCheck,
  Ban,
  Edit,
  Crown,
  X,
} from "lucide-react";



type User = {

  id:string;

  name:string | null;

  email:string;

  role:string;

  status:"active"|"blocked";

  createdAt:string;

};





export default function UsersPage(){



const [users,setUsers] =
useState<User[]>([]);



const [search,setSearch] =
useState("");



const [roleFilter,setRoleFilter] =
useState("all");



const [statusFilter,setStatusFilter] =
useState("all");



const [loading,setLoading] =
useState(true);




const [resetUser,setResetUser] =
useState<User | null>(null);



const [newPassword,setNewPassword] =
useState("");



const [resetLoading,setResetLoading] =
useState(false);







useEffect(()=>{

fetchUsers();

},[]);







async function fetchUsers(){


try{


setLoading(true);



const res =
await fetch(
"/api/users/list",
{
cache:"no-store"
}
);



const data =
await res.json();



if(data.success){

setUsers(data.users);

}



}
catch(error){

console.error(error);

}
finally{

setLoading(false);

}


}









async function resetPassword(){



if(!resetUser)
return;





if(newPassword.length < 8){


alert(
"Password must contain minimum 8 characters"
);


return;


}







try{


setResetLoading(true);





const res =
await fetch(
"/api/users/reset",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

userId:resetUser.id,

newPassword

})


}

);





const data =
await res.json();





if(data.success){


alert(
"Password reset successful"
);



setResetUser(null);

setNewPassword("");



}
else{


alert(
data.message ||
"Reset failed"
);


}




}
catch(error){


console.error(error);


alert(
"Something went wrong"
);


}
finally{


setResetLoading(false);


}



}









async function deleteUser(id:string){



if(
!confirm(
"Delete this user permanently?"
)
)
return;





const res =
await fetch(
"/api/users/delete",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

id

})

}

);





const data =
await res.json();





if(data.success){

fetchUsers();

}



}









async function toggleStatus(user:User){



const next =
user.status==="active"
?
"blocked"
:
"active";





await fetch(
"/api/users/status",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

id:user.id,

status:next

})


}

);



fetchUsers();



}









const filteredUsers =
users.filter(user=>{


const matchSearch =

user.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

user.email
.toLowerCase()
.includes(
search.toLowerCase()
);





const matchRole =

roleFilter==="all"

||

user.role===roleFilter;





const matchStatus =

statusFilter==="all"

||

user.status===statusFilter;





return (

matchSearch

&&

matchRole

&&

matchStatus

);


});







return (

<div className="space-y-8 text-white">


<div
className="
flex
justify-between
items-center
"
>


<div>


<h1
className="
text-3xl
font-bold
"
>

User Management

</h1>


<p
className="
text-gray-400
"
>

Manage NationPath users & team

</p>


</div>





<Link

href="/admin/users/create"

className="
flex
items-center
gap-2
bg-[#EA661B]
px-5
py-3
rounded-xl
font-semibold
"

>


<UserPlus size={18}/>


Create User


</Link>



</div>





<div
className="
grid
grid-cols-2
md:grid-cols-5
gap-4
"
>


<Card title="Total" value={users.length}/>


<Card
title="Admins"
value={
users.filter(
u=>
u.role==="admin"
||
u.role==="superadmin"
).length
}
/>



<Card
title="Editors"
value={
users.filter(
u=>u.role==="editor"
).length
}
/>



<Card
title="Reporters"
value={
users.filter(
u=>u.role==="reporter"
).length
}
/>



<Card
title="Blocked"
value={
users.filter(
u=>u.status==="blocked"
).length
}
/>


</div>









<div
className="
bg-[#0b1220]
border
border-white/10
rounded-2xl
p-6
"
>


<div
className="
flex
gap-4
flex-wrap
mb-6
"
>


<div
className="
flex
items-center
gap-3
bg-black/30
rounded-xl
px-4
flex-1
"
>


<Search size={18}/>


<input

value={search}

onChange={
e=>setSearch(
e.target.value
)
}

placeholder="Search user..."

className="
bg-transparent
outline-none
w-full
py-3
"

/>


</div>





<select

value={roleFilter}

onChange={
e=>setRoleFilter(
e.target.value
)
}

className="
bg-black/30
border
border-white/10
rounded-xl
px-4
"

>


<option value="all">
All Roles
</option>


<option value="superadmin">
Super Admin
</option>


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


</select>







<select

value={statusFilter}

onChange={
e=>setStatusFilter(
e.target.value
)
}

className="
bg-black/30
border
border-white/10
rounded-xl
px-4
"

>


<option value="all">
All Status
</option>


<option value="active">
Active
</option>


<option value="blocked">
Blocked
</option>


</select>





<button

onClick={fetchUsers}

className="
bg-white/10
px-4
rounded-xl
flex
gap-2
items-center
"

>


<RefreshCcw size={16}/>


Refresh


</button>


</div>







<div className="overflow-x-auto">


<table className="w-full">


<thead>


<tr className="
border-b
border-white/10
text-gray-400
text-sm
">


<th className="text-left py-4">
User
</th>


<th>
Role
</th>


<th>
Status
</th>


<th>
Created
</th>


<th>
Actions
</th>


</tr>


</thead>







<tbody>


{

loading ?


<tr>

<td
colSpan={5}
className="text-center py-10"
>

Loading...

</td>

</tr>



:



filteredUsers.map(user=>(


<tr

key={user.id}

className="
border-b
border-white/5
hover:bg-white/5
"

>


<td className="py-4">


<div className="
flex
items-center
gap-3
">


<div
className="
w-10
h-10
rounded-full
bg-orange-500
text-black
flex
items-center
justify-center
font-bold
"
>


{

user.name
?.charAt(0)
||
"U"

}


</div>



<div>


<p className="font-semibold">

{user.name || "Unknown"}

</p>


<p className="
text-sm
text-gray-400
">

{user.email}

</p>


</div>


</div>


</td>





<td>

<Role role={user.role}/>

</td>





<td>


<button

onClick={()=>
toggleStatus(user)
}

className={`
px-3
py-1
rounded-full
text-xs

${
user.status==="active"

?

"bg-green-500/20 text-green-400"

:

"bg-red-500/20 text-red-400"

}

`}

>

{user.status}

</button>


</td>







<td>

{
new Date(
user.createdAt
).toLocaleDateString()
}

</td>







<td>


<div className="
flex
gap-4
justify-center
">


<Link

href={`/admin/users/${user.id}/edit`}

className="
text-yellow-400
"

>


<Edit size={18}/>


</Link>






<button

onClick={()=>
setResetUser(user)
}

className="
text-blue-400
hover:text-blue-300
"

title="Reset Password"

>


<KeyRound size={18}/>


</button>







<button

onClick={()=>
toggleStatus(user)
}

className="
text-green-400
"

>


{

user.status==="active"

?

<Ban size={18}/>

:

<ShieldCheck size={18}/>

}


</button>







<button

onClick={()=>
deleteUser(user.id)
}

className="
text-red-400
"

>


<Trash2 size={18}/>


</button>


</div>


</td>


</tr>


))


}


</tbody>


</table>


</div>


</div>







{


resetUser && (


<div

className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
z-50
px-4
"

>


<div

className="
bg-[#0b1220]
border
border-white/10
rounded-2xl
p-6
w-full
max-w-md
"

>


<div

className="
flex
justify-between
items-center
mb-5
"

>


<h2 className="text-xl font-bold">

Reset Password

</h2>


<button

onClick={()=>{

setResetUser(null);

setNewPassword("");

}}

>

<X size={20}/>

</button>


</div>





<p className="
text-gray-400
text-sm
mb-4
">

Reset password for:

<br/>

<span className="text-white">

{resetUser.email}

</span>

</p>







<input

type="password"

value={newPassword}

onChange={
e=>setNewPassword(
e.target.value
)
}

placeholder="Enter new password"

className="
w-full
bg-black/30
border
border-white/10
rounded-xl
px-4
py-3
outline-none
mb-5
"

/>






<button

onClick={resetPassword}

disabled={resetLoading}

className="
w-full
bg-[#EA661B]
py-3
rounded-xl
font-semibold
disabled:opacity-50
"

>


{

resetLoading

?

"Resetting..."

:

"Reset Password"

}


</button>


</div>


</div>


)

}



</div>

);


}









function Role({
role
}:{
role:string
}){


if(role==="superadmin")


return (


<span
className="
flex
items-center
gap-1
px-3
py-1
rounded-full
text-xs
bg-yellow-500/20
text-yellow-300
"
>


<Crown size={12}/>


Super Admin


</span>


);





const colors:any={


admin:
"bg-orange-500/20 text-orange-300",


editor:
"bg-blue-500/20 text-blue-300",


reporter:
"bg-green-500/20 text-green-300",


advertiser:
"bg-purple-500/20 text-purple-300",


user:
"bg-gray-500/20 text-gray-300"


};





return (


<span

className={`

px-3

py-1

rounded-full

text-xs

${colors[role]}

`}

>


{role}


</span>


);


}








function Card({

title,

value

}:{

title:string;

value:number;

}){


return (


<div

className="
bg-[#0b1220]
border
border-white/10
rounded-xl
p-5
"

>


<p className="text-gray-400 text-sm">

{title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">


{value}


</h2>


</div>


);


}