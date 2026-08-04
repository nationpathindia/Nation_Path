"use client";


import {
  useCallback,
  useEffect,
  useState,
} from "react";


import PostsHeader 
from "@/components/admin/posts/PostsHeader";

import PostsStatsCards 
from "@/components/admin/posts/PostsStatsCards";

import PostsFilters 
from "@/components/admin/posts/PostsFilters";

import PostsActions 
from "@/components/admin/posts/PostsActions";

import PostsTable 
from "@/components/admin/posts/PostsTable";

import PostsMobileCards 
from "@/components/admin/posts/PostsMobileCards";

import PostsPagination 
from "@/components/admin/posts/PostsPagination";





interface AdminPost {


  id:string;


  title:string;


  slug:string;


  status:string;


  createdAt:string;


  publishedAt?:string | null;


  isEditorial?:boolean;


  breaking?:boolean;


  featured?:boolean;


  flash?:boolean;


  category?:{

    name:string;

  } | null;



}






interface PostStats {


  totalArticles:number;


  approvedArticles:number;


  pendingArticles:number;


  draftArticles:number;


  featuredArticles:number;


  breakingArticles:number;


  editorialArticles:number;


  scheduledArticles:number;


}








export default function AdminPostsPage(){



const [posts,setPosts] = useState<AdminPost[]>([]);


const [loading,setLoading] = useState(false);




const [page,setPage] = useState(1);


const [totalPages,setTotalPages] = useState(1);






// Filters


const [search,setSearch] = useState("");


const [status,setStatus] = useState("");


const [category,setCategory] = useState("");


const [editorial,setEditorial] = useState("");


const [schedule,setSchedule] = useState("");


const [breaking,setBreaking] = useState("");


const [featured,setFeatured] = useState("");


const [flash,setFlash] = useState("");








const [stats,setStats] = useState<PostStats>({


totalArticles:0,


approvedArticles:0,


pendingArticles:0,


draftArticles:0,


featuredArticles:0,


breakingArticles:0,


editorialArticles:0,


scheduledArticles:0,


});









const fetchPosts = useCallback(async()=>{


try{


setLoading(true);



const params = new URLSearchParams();



params.set(
"page",
String(page)
);



params.set(
"limit",
"20"
);





if(search)
params.set(
"search",
search
);




if(status)
params.set(
"status",
status
);




if(category)
params.set(
"category",
category
);




if(editorial)
params.set(
"editorial",
editorial
);




if(schedule)
params.set(
"schedule",
schedule
);




if(breaking)
params.set(
"breaking",
breaking
);




if(featured)
params.set(
"featured",
featured
);




if(flash)
params.set(
"flash",
flash
);






const res = await fetch(

`/api/articles?${params.toString()}`

);




const data = await res.json();




if(data.success){



setPosts(

data.articles || []

);



setTotalPages(

data.pagination?.totalPages || 1

);



}




}

catch(error){



console.error(

"FETCH POSTS ERROR",

error

);



}


finally{


setLoading(false);


}



},[

page,
search,
status,
category,
editorial,
schedule,
breaking,
featured,
flash

]);









const fetchStats = useCallback(async()=>{


try{


const res = await fetch(

"/api/articles/stats"

);



const data = await res.json();



if(data.success){


setStats(

data.stats

);


}



}

catch(error){


console.error(

"STATS ERROR",

error

);



}



},[]);









useEffect(()=>{


fetchPosts();


fetchStats();



},[

fetchPosts,
fetchStats

]);









async function updateStatus(

id:string,

value:string

){



await fetch(

`/api/articles/${id}`,

{


method:"PATCH",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({


id,


status:value


})


}


);



fetchPosts();


fetchStats();



}









async function deletePost(

id:string

){



if(

!confirm(

"Delete this article?"

)

)

return;






await fetch(

"/api/articles",

{


method:"DELETE",


headers:{


"Content-Type":

"application/json"


},


body:JSON.stringify({

id

})


}


);





fetchPosts();


fetchStats();



}








function clearFilters(){



setSearch("");

setStatus("");

setCategory("");

setEditorial("");

setSchedule("");

setBreaking("");

setFeatured("");

setFlash("");

setPage(1);



}
return (

<div

className="
min-h-screen
bg-[#020617]
text-white
p-5
md:p-10
"

>


{/* HEADER */}

<PostsHeader />







{/* STATS */}

<PostsStatsCards

stats={stats}

/>








{/* FILTERS */}

<PostsFilters


search={search}

setSearch={(value)=>{

setSearch(value);

setPage(1);

}}




category={category}

setCategory={(value)=>{

setCategory(value);

setPage(1);

}}





status={status}

setStatus={(value)=>{

setStatus(value);

setPage(1);

}}





editorial={editorial}

setEditorial={(value)=>{

setEditorial(value);

setPage(1);

}}





schedule={schedule}

setSchedule={(value)=>{

setSchedule(value);

setPage(1);

}}





breaking={breaking}

setBreaking={(value)=>{

setBreaking(value);

setPage(1);

}}





featured={featured}

setFeatured={(value)=>{

setFeatured(value);

setPage(1);

}}





flash={flash}

setFlash={(value)=>{

setFlash(value);

setPage(1);

}}





clearFilters={clearFilters}


/>










{/* CREATE ACTIONS */}


<PostsActions />









{/* TABLE */}


<PostsTable


posts={posts}

loading={loading}

updateStatus={updateStatus}

deletePost={deletePost}


/>









{/* MOBILE VIEW */}


<PostsMobileCards


posts={posts}

deletePost={deletePost}


/>









{/* PAGINATION */}


<PostsPagination


page={page}

totalPages={totalPages}

setPage={setPage}


/>





</div>


);
}