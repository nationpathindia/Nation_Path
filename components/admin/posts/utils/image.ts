// components/admin/posts/utils/image.ts


import type {
  ImageGalleryItem
} from "../types";



export function syncPrimaryImages(
  gallery:ImageGalleryItem[]
){


const primary =

gallery.find(
  img=>img.isPrimary
)

||

gallery[0];




return {


imageGallery:

gallery.map(
(img,index)=>({


...img,


isPrimary:

primary

?

img.url===primary.url

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