"use client";

import {useEffect,useState} from "react";

import {
Sun,
CloudSun,
Cloud,
CloudRain,
Sunrise,
Sunset,
Wind,
Droplets,
Activity
} from "lucide-react";



interface WeatherData{

city:string;

country:string;

temperature:number;

condition:string;

humidity:number;

wind:number;

aqi:number;

sunrise:string;

sunset:string;

}




export default function WeatherWidget(){



const [weather,setWeather]
=
useState<WeatherData|null>(null);



const [loading,setLoading]
=
useState(true);






useEffect(()=>{


async function load(){


try{


const locationRes =
await fetch("/api/location");



const location =
await locationRes.json();



const {

city,

country,

latitude,

longitude

}=location;







const weatherRes =
await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=sunrise,sunset&timezone=auto`

);



const weatherJson =
await weatherRes.json();







const aqiRes =
await fetch(

`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi`

);



const aqiJson =
await aqiRes.json();







setWeather({

city,

country,


temperature:
Math.round(
weatherJson.current.temperature_2m
),



condition:
condition(
weatherJson.current.weather_code
),



humidity:
weatherJson.current.relative_humidity_2m,



wind:
Math.round(
weatherJson.current.wind_speed_10m
),



aqi:
aqiJson.current?.us_aqi ?? 0,



sunrise:
formatTime(
weatherJson.daily.sunrise[0]
),



sunset:
formatTime(
weatherJson.daily.sunset[0]
),


});



}

catch(err){

console.log(
"Weather error",
err
);

}

finally{

setLoading(false);

}



}


load();


},[]);







if(loading)

return (

<div

className="

border-t

border-b

border-[var(--news-border)]

py-6

text-sm

text-[var(--news-muted)]

"

>

Loading weather...

</div>

);








if(!weather)

return null;







return (


<section

className="

border-t

border-b

border-[var(--news-border)]

py-6

"

>







<header

className="

flex

justify-between

items-start

pb-5

border-b

border-[var(--news-border)]

"

>



<div>


<p

className="

text-[10px]

uppercase

tracking-[0.3em]

font-bold

text-[var(--news-light-text)]

"

>

Weather Desk

</p>




<p

className="

mt-2

font-semibold

text-[var(--news-text)]

"

>

{weather.city}, {weather.country}

</p>


</div>





<span

className="

w-2

h-2

rounded-full

bg-[var(--news-orange)]

mt-1

"

/>



</header>









<div

className="

pt-6

"

>





<div

className="

flex

justify-between

items-center

"

>





<div>


<h2

className="

text-6xl

font-serif

font-bold

tracking-tight

text-[var(--news-text)]

"

>

{weather.temperature}°

</h2>




<p

className="

mt-2

font-semibold

text-[var(--news-text)]

"

>

{weather.condition}

</p>


</div>








<div

className="

w-20

h-20

rounded-full

bg-[var(--news-orange)]/10

flex

items-center

justify-center

"

>


{

weatherIcon(
weather.condition
)

}


</div>




</div>









<div

className="

grid

grid-cols-3

gap-4

mt-8

pt-5

border-t

border-[var(--news-border)]

"

>


<Item

icon={<Droplets size={15}/>}

title="Humidity"

value={`${weather.humidity}%`}

/>



<Item

icon={<Wind size={15}/>}

title="Wind"

value={`${weather.wind} km/h`}

/>




<Item

icon={<Activity size={15}/>}

title="AQI"

value={aqi(weather.aqi)}

/>



</div>









<div

className="

grid

grid-cols-2

gap-4

mt-6

pt-5

border-t

border-[var(--news-border)]

"

>



<TimeBox

icon={<Sunrise size={18}/>}

title="Sunrise"

value={weather.sunrise}

/>





<TimeBox

icon={<Sunset size={18}/>}

title="Sunset"

value={weather.sunset}

/>



</div>






</div>







</section>


);


}









function Item({
icon,
title,
value
}:any){


return (


<div>



<div

className="

flex

items-center

gap-2

text-[var(--news-light-text)]

"

>


{icon}



<span

className="

text-[10px]

uppercase

tracking-wider

"

>

{title}

</span>


</div>






<p

className="

mt-2

font-bold

text-[var(--news-text)]

"

>

{value}

</p>





</div>


);


}









function TimeBox({
icon,
title,
value
}:any){


return (


<div

className="

flex

items-center

gap-3

"

>



<div

className="

flex

items-center

justify-center

w-8

h-8

rounded-full

bg-[var(--news-orange)]/10

text-[var(--news-orange)]

"

>


{icon}


</div>






<div>


<p

className="

text-[10px]

uppercase

tracking-wider

font-semibold

text-[var(--news-light-text)]

"

>

{title}

</p>




<p

className="

mt-1

text-sm

font-bold

text-[var(--news-text)]

"

>

{value}

</p>



</div>



</div>


);


}









function weatherIcon(type:string){



const props={

size:42,

strokeWidth:1.5,

className:"text-[var(--news-orange)]"

};




if(type==="Clear Sky")

return <Sun {...props}/>;


if(type==="Partly Cloudy")

return <CloudSun {...props}/>;


if(type==="Rain")

return <CloudRain {...props}/>;


return <Cloud {...props}/>;


}









function condition(code:number){


if(code===0)

return "Clear Sky";


if(code<=3)

return "Partly Cloudy";


if(code<=67)

return "Rain";


return "Cloudy";


}









function formatTime(time:string){


return new Date(time)

.toLocaleTimeString(

"en-IN",

{

hour:"2-digit",

minute:"2-digit",

hour12:true

}

);


}









function aqi(value:number){


if(value<=50)

return "Good";


if(value<=100)

return "Moderate";


if(value<=150)

return "Poor";


return "Bad";


}