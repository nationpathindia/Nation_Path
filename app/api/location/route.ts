import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(req:Request){

try{


const headers=req.headers;



const city =
headers.get("x-vercel-ip-city")
||
null;



const country =
headers.get("x-vercel-ip-country")
||
null;



const latitude =
headers.get("x-vercel-ip-latitude")
||
null;



const longitude =
headers.get("x-vercel-ip-longitude")
||
null;



return NextResponse.json(
{
  city:
  city || "New Delhi",

  country:
  country || "India",

  latitude:
  latitude || "28.6139",

  longitude:
  longitude || "77.2090",
},
{
  headers:{
    "Cache-Control":
    "public, s-maxage=3600, stale-while-revalidate=7200"
  }
}
);



}

catch(error){


return NextResponse.json({

city:"New Delhi",

country:"India",

latitude:"28.6139",

longitude:"77.2090",

});


}


}