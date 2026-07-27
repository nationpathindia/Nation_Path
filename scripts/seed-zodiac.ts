//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// ZODIAC MASTER SEED
//
// Collection:
// MongoDB -> zodiacs
//
// Purpose:
// Master zodiac intelligence data
//
// No horoscope generation
// No engine dependency
//////////////////////////////////////////////////////////////

import "dotenv/config";
import { connectMongoDB } from "@/lib/mongodb";

import Zodiac from "@/app/models/Zodiac";





const zodiacData = [


{
zodiac:"scorpio",
slug:"scorpio",

names:{
english:"Scorpio",
hindi:"Vrishchik",
sanskrit:"Vrishchika",
gujarati:"Vrishchik",
nepali:"Vrishchik",
},

symbol:"/zodiac/scorpio.png",

element:"water",

modality:"fixed",

rulingPlanet:"Mars",


identity:{
rashi:"Vrishchik Rashi",
sanskritName:"Vrishchika",
dates:"October 23 - November 21",
description:
"Scorpio represents transformation, depth and hidden strength.",
energy:"Mars Energy",
},


traits:{
strengths:[
"Determination",
"Intuition",
"Focus"
],

weaknesses:[
"Secretive",
"Intense"
],

personality:
"A powerful water sign with deep emotional intelligence."
},


lucky:{
color:"Maroon",
number:"9",
day:"Tuesday"
},


media:{
icon:"/zodiac/scorpio.png",
banner:""
},


seo:{
title:"Scorpio Zodiac",
description:
"Scorpio astrology intelligence."
},


status:"published"

},





{
zodiac:"sagittarius",
slug:"sagittarius",

names:{
english:"Sagittarius",
hindi:"Dhanu",
sanskrit:"Dhanu",
gujarati:"Dhanu",
nepali:"Dhanu",
},

symbol:"/zodiac/sagittarius.png",

element:"fire",

modality:"mutable",

rulingPlanet:"Jupiter",


identity:{
rashi:"Dhanu Rashi",
sanskritName:"Dhanu",
dates:"November 22 - December 21",
description:
"Sagittarius represents wisdom, exploration and higher knowledge.",
energy:"Jupiter Energy",
},


traits:{
strengths:[
"Wisdom",
"Optimism",
"Learning"
],

weaknesses:[
"Restless",
"Impatient"
],

personality:
"An adventurous fire sign seeking knowledge."
},


lucky:{
color:"Yellow",
number:"3",
day:"Thursday"
},


media:{
icon:"/zodiac/sagittarius.png",
banner:""
},


seo:{
title:"Sagittarius Zodiac",
description:
"Sagittarius astrology intelligence."
},


status:"published"

},





{
zodiac:"capricorn",
slug:"capricorn",

names:{
english:"Capricorn",
hindi:"Makar",
sanskrit:"Makara",
gujarati:"Makar",
nepali:"Makar",
},

symbol:"/zodiac/capricorn.png",

element:"earth",

modality:"cardinal",

rulingPlanet:"Saturn",


identity:{
rashi:"Makar Rashi",
sanskritName:"Makara",
dates:"December 22 - January 19",
description:
"Capricorn represents discipline, ambition and responsibility.",
energy:"Saturn Energy",
},


traits:{
strengths:[
"Discipline",
"Responsibility",
"Patience"
],

weaknesses:[
"Rigid",
"Serious"
],

personality:
"A practical earth sign focused on achievement."
},


lucky:{
color:"Black",
number:"8",
day:"Saturday"
},


media:{
icon:"/zodiac/capricorn.png",
banner:""
},


seo:{
title:"Capricorn Zodiac",
description:
"Capricorn astrology intelligence."
},


status:"published"

},





{
zodiac:"aquarius",
slug:"aquarius",

names:{
english:"Aquarius",
hindi:"Kumbh",
sanskrit:"Kumbha",
gujarati:"Kumbh",
nepali:"Kumbh",
},

symbol:"/zodiac/aquarius.png",

element:"air",

modality:"fixed",

rulingPlanet:"Saturn",


identity:{
rashi:"Kumbh Rashi",
sanskritName:"Kumbha",
dates:"January 20 - February 18",
description:
"Aquarius represents innovation, ideas and humanitarian vision.",
energy:"Saturn Energy",
},


traits:{
strengths:[
"Innovation",
"Vision",
"Originality"
],

weaknesses:[
"Detached",
"Unpredictable"
],

personality:
"A visionary air sign with unique thinking."
},


lucky:{
color:"Blue",
number:"8",
day:"Saturday"
},


media:{
icon:"/zodiac/aquarius.png",
banner:""
},


seo:{
title:"Aquarius Zodiac",
description:
"Aquarius astrology intelligence."
},


status:"published"

},





{
zodiac:"pisces",
slug:"pisces",

names:{
english:"Pisces",
hindi:"Meen",
sanskrit:"Meena",
gujarati:"Meen",
nepali:"Meen",
},

symbol:"/zodiac/pisces.png",

element:"water",

modality:"mutable",

rulingPlanet:"Jupiter",


identity:{
rashi:"Meen Rashi",
sanskritName:"Meena",
dates:"February 19 - March 20",
description:
"Pisces represents intuition, compassion and spiritual depth.",
energy:"Jupiter Energy",
},


traits:{
strengths:[
"Compassion",
"Creativity",
"Intuition"
],

weaknesses:[
"Sensitive",
"Escapism"
],

personality:
"A spiritual water sign guided by imagination."
},


lucky:{
color:"Sea Green",
number:"3",
day:"Thursday"
},


media:{
icon:"/zodiac/pisces.png",
banner:""
},


seo:{
title:"Pisces Zodiac",
description:
"Pisces astrology intelligence."
},


status:"published"

},



];







async function seed(){


try{


await connectMongoDB();


console.log("Connected MongoDB");



for(const item of zodiacData){


await (Zodiac as any)
.findOneAndUpdate(

{
slug:item.slug
},

{
$set:item
},

{
upsert:true,
new:true
}

);


console.log(
"Seeded:",
item.zodiac
);


}



console.log(
"Zodiac seed completed"
);


process.exit(0);



}

catch(error){


console.error(
"ZODIAC SEED ERROR",
error
);


process.exit(1);


}



}



seed();