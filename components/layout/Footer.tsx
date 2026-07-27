import Link from "next/link";

import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail
} from "lucide-react";



export default function Footer(){


return (

<footer className="news-footer">


<div className="news-container">





<div

className="

grid

grid-cols-1

sm:grid-cols-2

lg:grid-cols-4

gap-10

py-12

lg:py-16

"

>






{/* BRAND */}


<div>


<h2

className="

text-2xl

font-black

tracking-tight

text-white

mb-4

"

>

NationPath India

</h2>



<p

className="

text-sm

leading-7

text-white/60

max-w-sm

"

>

Premium Indian digital newsroom delivering
credible journalism, national perspectives,
and stories that matter.

</p>



</div>









{/* CATEGORIES */}


<div>


<h3

className="

text-xs

font-bold

uppercase

tracking-[0.18em]

text-white

mb-5

"

>

Categories

</h3>



<ul

className="

space-y-3

text-sm

text-white/60

"

>


<li>

<Link

href="/india"

className="hover:text-white transition"

>

India

</Link>

</li>



<li>

<Link

href="/world"

className="hover:text-white transition"

>

World

</Link>

</li>




<li>

<Link

href="/business"

className="hover:text-white transition"

>

Business

</Link>

</li>




<li>

<Link

href="/technology"

className="hover:text-white transition"

>

Technology

</Link>

</li>



</ul>


</div>









{/* NEWSLETTER */}


<div>


<h3

className="

text-xs

font-bold

uppercase

tracking-[0.18em]

text-white

mb-5

"

>

Newsletter

</h3>




<p

className="

text-sm

leading-6

text-white/60

mb-4

"

>

Get important updates directly
from NationPath India.

</p>






<div

className="

flex

items-center

gap-2

"

>


<div

className="

flex

items-center

gap-2

flex-1

bg-white/5

border

border-white/10

rounded-lg

px-3

py-2

"

>


<Mail

size={16}

className="text-white/50"

/>



<span

className="

text-xs

text-white/50

"

>

Email updates

</span>



</div>





<button

className="

bg-[var(--news-orange)]

text-white

text-xs

font-bold

px-4

py-2

rounded-lg

hover:opacity-90

transition

"

>

Join

</button>




</div>




</div>









{/* SOCIAL */}


<div>


<h3

className="

text-xs

font-bold

uppercase

tracking-[0.18em]

text-white

mb-5

"

>

Follow

</h3>






<div

className="

flex

items-center

gap-3

"

>







<a

href="https://www.youtube.com/@NationPathIndia"

target="_blank"

rel="noopener noreferrer"

aria-label="YouTube"

className="

w-9

h-9

rounded-full

border

border-white/10

flex

items-center

justify-center

text-white/70

hover:text-[var(--news-orange)]

transition

"

>

<Youtube size={16}/>

</a>









<a

href="https://www.facebook.com/profile.php?id=61587529251948"

target="_blank"

rel="noopener noreferrer"

aria-label="Facebook"

className="

w-9

h-9

rounded-full

border

border-white/10

flex

items-center

justify-center

text-white/70

hover:text-[var(--news-orange)]

transition

"

>

<Facebook size={16}/>

</a>









<a

href="https://www.instagram.com/nationpathindia/"

target="_blank"

rel="noopener noreferrer"

aria-label="Instagram"

className="

w-9

h-9

rounded-full

border

border-white/10

flex

items-center

justify-center

text-white/70

hover:text-[var(--news-orange)]

transition

"

>

<Instagram size={16}/>

</a>









<a

href="https://x.com/nationpathindia"

target="_blank"

rel="noopener noreferrer"

aria-label="X"

className="

w-9

h-9

rounded-full

border

border-white/10

flex

items-center

justify-center

text-white/70

hover:text-[var(--news-orange)]

transition

"

>

<Twitter size={16}/>

</a>







</div>




</div>







</div>









{/* BOTTOM LEGAL BAR */}



<div

className="

border-t

border-white/10

py-5

flex

flex-col

md:flex-row

items-center

justify-between

gap-4

"

>



<p

className="

text-xs

text-white/50

text-center

md:text-left

"

>

© {new Date().getFullYear()} NationPath India.
All rights reserved.

</p>






<div

className="

flex

flex-wrap

justify-center

gap-5

text-xs

text-white/50

"

>



<Link

href="/about"

className="hover:text-white transition"

>

About

</Link>



<Link

href="/contact"

className="hover:text-white transition"

>

Contact

</Link>



<Link

href="/advertise"

className="hover:text-white transition"

>

Advertise

</Link>



<Link

href="/privacy-policy"

className="hover:text-white transition"

>

Privacy

</Link>



<Link

href="/terms"

className="hover:text-white transition"

>

Terms

</Link>



<Link

href="/editorial-policy"

className="hover:text-white transition"

>

Editorial Policy

</Link>




</div>



</div>








</div>



</footer>


);


}