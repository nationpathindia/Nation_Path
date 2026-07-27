//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO SHELL
//
// Responsibility:
// Global Astro public layout wrapper
//////////////////////////////////////////////////////////////

import type {
  ReactNode,
} from "react";


import AstroHeader from "./AstroHeader";

import AstroFooter from "./AstroFooter";





interface AstroShellProps {

  children:ReactNode;

}





export default function AstroShell({

children,

}:AstroShellProps){



return (


<div

className="
relative
min-h-screen
overflow-hidden
bg-[#120C08]
text-[#FFF4D6]
flex
flex-col
"

>





{/* COSMIC BACKGROUND */}


<div

className="
pointer-events-none
absolute
inset-0
"

>


<div

className="
absolute
inset-0
bg-[radial-gradient(circle_at_top,#3B2600_0%,transparent_35%)]
opacity-40
"

/>



<div

className="
absolute
inset-0
bg-[radial-gradient(circle_at_80%_20%,#D4AF37_0%,transparent_20%)]
opacity-10
"

/>



<div

className="
absolute
inset-0
bg-[url('/noise.png')]
opacity-[0.03]
"

/>


</div>







<div

className="
relative
z-10
flex
min-h-screen
flex-col
"

>


<AstroHeader />





<main

className="
flex-1
"

>

{children}

</main>





<AstroFooter />



</div>



</div>


);


}