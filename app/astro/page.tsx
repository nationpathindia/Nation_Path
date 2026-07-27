//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// ASTRO ENTRY REDIRECT
//
// PRIMARY PUBLIC EXPERIENCE:
//
// /astro
//      ↓
// /astro/horoscope
//
//////////////////////////////////////////////////////////////

import { redirect } from "next/navigation";





export default function AstroPage() {


  redirect("/astro/horoscope");


}