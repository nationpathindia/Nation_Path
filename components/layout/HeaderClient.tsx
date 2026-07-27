"use client";

import { useEffect, useState } from "react";

import HeaderTop from "./HeaderTop";
import Logo from "./Logo";

import BreakingNewsBar from "@/components/BreakingNewsBar";


export default function HeaderClient() {


const [shrink,setShrink] = useState(false);



useEffect(()=>{


const handleScroll = () => {

setShrink(
window.scrollY > 80
);

};



window.addEventListener(
"scroll",
handleScroll
);



return () => {

window.removeEventListener(
"scroll",
handleScroll
);

};


},[]);





return (

<header

className={`
sticky
top-0
z-50

transition-all
duration-300

bg-transparent

${
shrink
?
"shadow-[0_8px_25px_rgba(0,0,0,0.12)]"
:
"shadow-none"
}

`}

>





{/* =========================================
    TOP DARK INFORMATION STRIP
========================================= */}


<div

className={`

overflow-hidden

transition-all
duration-500

bg-[#0b1220]

${
shrink
?
"max-h-0 opacity-0"
:
"max-h-20 opacity-100"
}

`}

>


<HeaderTop />


</div>







{/* =========================================
    LOGO MASTHEAD
========================================= */}


<div

className="
news-masthead
"

>


<div

className={`

news-container

flex
items-center
justify-center

transition-all
duration-300

${
shrink
?
"py-2"
:
"py-5 sm:py-6"
}

`}

>


<Logo />


</div>


</div>







{/* =========================================
    BREAKING NEWS BAR
========================================= */}


<div

className="
news-breaking
"

>


<BreakingNewsBar />


</div>





</header>


);

}