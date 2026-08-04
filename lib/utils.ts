import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {

  return twMerge(clsx(inputs))

}





/*
====================================================
 SLUG GENERATOR
 Used for SEO friendly URLs
====================================================
*/


export function createSlug(text:string){


return text

.toLowerCase()

.trim()

.replace(/[^a-z0-9\s-]/g,"")

.replace(/\s+/g,"-")

.replace(/-+/g,"");


}