// components/admin/posts/sections/MediaSection.tsx

"use client";

import type {
  PostFormData,
  ImageGalleryItem
} from "../types";


interface Props {

  form:PostFormData;

  updateField:
  (
    key:keyof PostFormData,
    value:any
  )=>void;


  uploading?:boolean;


  setUploading?:
  (
    value:boolean
  )=>void;


  setError?:
  (
    value:string
  )=>void;

}



function syncPrimaryImages(
gallery:ImageGalleryItem[]
){

const primary =
gallery.find(
item=>item.isPrimary
)
||
gallery[0];


return {


imageGallery:

gallery.map(
(item,index)=>({

...item,

isPrimary:

primary

?

item.url===primary.url

:

index===0

})

),



images:

primary

?

[primary.url]

:

[]


};


}





export default function MediaSection({

form,

updateField,

uploading=false,

setUploading,

setError

}:Props){





async function uploadImages(
files:FileList
){



if(
form.imageGallery.length + files.length > 5
){

setError?.(
"Maximum 5 images allowed"
);

return;

}



setUploading?.(true);

setError?.("");



try{


const uploaded:ImageGalleryItem[]=[];



for(
const file of Array.from(files)
){



if(
!file.type.startsWith("image/")
){

throw new Error(
"Only image files allowed"
);

}



if(
file.size > 2 * 1024 * 1024
){

throw new Error(
"Image size must be under 2MB"
);

}




const fd =
new FormData();


fd.append(
"file",
file
);


fd.append(
"upload_preset",
process.env
.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
);





const res =
await fetch(

`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

{

method:"POST",

body:fd

}

);



const data =
await res.json();



if(
data.secure_url
){

uploaded.push({

url:data.secure_url,


alt:

form.title

?

`${form.title} - NationPath Image`

:

"NationPath Image",



caption:

form.title

||

"NationPath Article",



isPrimary:false


});

}


}





const merged=[

...form.imageGallery,

...uploaded

];




const synced =
syncPrimaryImages(
merged
);



updateField(
"imageGallery",
synced.imageGallery
);



updateField(
"images",
synced.images
);



}
catch(error:any){


setError?.(

error.message ||

"Image upload failed"

);


}
finally{


setUploading?.(false);


}


}







function setPrimary(
index:number
){


const updated =

form.imageGallery.map(

(item,i)=>({

...item,

isPrimary:
i===index

})

);



const synced =
syncPrimaryImages(
updated
);



updateField(
"imageGallery",
synced.imageGallery
);



updateField(
"images",
synced.images
);


}







function removeImage(
index:number
){


const updated =

form.imageGallery.filter(

(_,i)=>i!==index

);



const synced =
syncPrimaryImages(
updated
);



updateField(
"imageGallery",
synced.imageGallery
);



updateField(
"images",
synced.images
);


}








function updateImage(

index:number,

key:"alt"|"caption",

value:string

){


updateField(

"imageGallery",

form.imageGallery.map(

(item,i)=>

i===index

?

{

...item,

[key]:value

}

:

item

)

);


}








return (

<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
space-y-5
"

>


<h2 className="font-semibold">

Media Gallery

</h2>



<input

type="file"

multiple

accept="image/*"


onChange={(e)=>{

if(
e.target.files
){

uploadImages(
e.target.files
);

}

}}


/>



{

uploading &&

<p className="text-orange-400 text-sm">

Uploading images...

</p>

}





{

form.imageGallery.map(

(img,index)=>(


<div

key={index}

className="
bg-black/20
rounded-xl
p-4
space-y-3
"

>


<img

src={img.url}

alt={img.alt}

className="
w-full
h-48
object-cover
rounded-xl
"

/>



<input

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="SEO Alt Text"


value={img.alt}


onChange={(e)=>

updateImage(
index,
"alt",
e.target.value
)

}

/>




<input

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Caption"


value={img.caption}


onChange={(e)=>

updateImage(
index,
"caption",
e.target.value
)

}

/>





<div className="flex gap-3">


<button

type="button"

onClick={()=>setPrimary(index)}

className="
bg-orange-600
px-4
py-2
rounded-lg
text-sm
"

>


{

img.isPrimary

?

"⭐ Primary"

:

"Set Primary"

}


</button>




<button

type="button"

onClick={()=>removeImage(index)}

className="
bg-red-600
px-4
py-2
rounded-lg
text-sm
"

>

Remove

</button>



</div>




</div>


)

)


}



</div>

);


}