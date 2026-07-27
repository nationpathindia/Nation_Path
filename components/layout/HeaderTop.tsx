import HeaderActions from "./HeaderActions";


export default function HeaderTop() {


const today =
new Date().toLocaleDateString(
"en-IN",
{
weekday:"long",
month:"long",
day:"numeric",
year:"numeric",
}
);



return (

<div

className="
news-topbar
"

>


<div

className="
news-container

min-h-[42px]

flex
items-center
justify-between

gap-4
"

>





<div

className="
flex
items-center
gap-3

overflow-hidden
"

>


<span

className="
text-[11px]
sm:text-xs

text-white/70

whitespace-nowrap
"

>

{today}

</span>





<span

className="
hidden
md:block

text-white/30

"

>

|

</span>





<span

className="
hidden
md:block

text-[11px]

uppercase

tracking-[0.18em]

text-white/60

truncate

"

>

Independent Journalism • National Perspective

</span>



</div>







<HeaderActions />





</div>


</div>

);


}