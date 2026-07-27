import Image from "next/image";
import Link from "next/link";


interface NewsCardProps {

  article:any;

  size?: "default" | "large" | "compact";

}





export default function NewsCard({

  article,

  size="default",

}:NewsCardProps){



if(!article)
return null;





const articleUrl =

article?.category?.slug

?

`/${article.category.slug}/${article.slug}`

:

"#";







const cleanText=(html:string)=>{


if(!html)
return "";



return html

.replace(/<\/?[^>]+(>|$)/g,"")

.replace(/\s+/g," ")

.trim();


};









const styles = {


large:{


image:
"aspect-[16/9]",


title:
"text-3xl sm:text-4xl lg:text-[44px]",


excerpt:true,


spacing:
"mb-6"


},





default:{


image:
"aspect-[16/9]",


title:
"text-xl sm:text-2xl lg:text-[28px]",


excerpt:true,


spacing:
"mb-5"


},





compact:{


image:
"aspect-[16/10]",


title:
"text-lg sm:text-xl",


excerpt:false,


spacing:
"mb-4"


}



};






const style =
styles[size];









return (


<article


className="group"


itemScope


itemType="https://schema.org/NewsArticle"


>



<Link


href={articleUrl}


className="block"


aria-label={`Read article: ${article.title}`}


>








{/* IMAGE */}



{

article?.images?.[0]

&&

(


<div


className={`

relative

overflow-hidden

rounded-xl

bg-[var(--news-soft)]

${style.image}

${style.spacing}

`}


>


<Image


src={article.images[0]}


alt={`${article.title} - Nation Path India`}


fill


sizes="

(max-width:768px) 100vw,

600px

"


priority={size==="large"}


className="

object-cover

transition-transform

duration-700

ease-out

group-hover:scale-[1.035]

"


itemProp="image"


/>







{/* Premium image depth */}


<div


className="

absolute

inset-0

bg-gradient-to-t

from-black/20

via-transparent

to-transparent

opacity-80

"


/>





</div>


)


}









{/* CATEGORY */}



{

article?.category?.name

&&

(


<div


className="

category-badge

mb-3

"


>


<span

className="category-line"

/>



<span

itemProp="articleSection"

>


{article.category.name}


</span>



</div>


)


}









{/* TITLE */}



<h2


className={`

news-headline

${style.title}

transition-colors

duration-300

group-hover:text-[var(--news-editorial-gold)]

`}


itemProp="headline"


>


{article.title}


</h2>









{/* DESCRIPTION */}



{

style.excerpt

&&

(


<p


className="

news-body

mt-4

text-sm

sm:text-base

leading-relaxed

line-clamp-3

"


itemProp="description"


>


{

cleanText(article.content)

.slice(0,180)

}

...


</p>


)


}









{/* META */}



<div


className="

mt-5

flex

flex-wrap

items-center

gap-2

text-[10px]

uppercase

tracking-[0.16em]

text-[var(--news-light-text)]

"


>


<span


itemProp="author"


className="font-semibold"

>


NationPath Editorial Desk


</span>





<span>

•

</span>







{

article.createdAt

&&

(


<time


dateTime={

new Date(article.createdAt)

.toISOString()

}


itemProp="datePublished"


>


{

new Date(article.createdAt)

.toLocaleDateString(

"en-IN",

{

day:"numeric",

month:"short",

year:"numeric"

}

)

}


</time>


)


}



</div>







</Link>







<meta


itemProp="publisher"


content="Nation Path India"


/>



</article>


);


}