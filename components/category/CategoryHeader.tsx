import SectionHeader from "@/components/common/SectionHeader";


interface CategoryHeaderProps {
  name: string;
  description?: string;
}


export default function CategoryHeader({
  name,
  description,
}: CategoryHeaderProps) {


  return (

    <section

      className="
      border-b
      border-black/10
      pb-10
      mb-10
      "

    >


      <SectionHeader
        title={name}
      />



      <h1

        className="
        mt-6
        font-serif
        font-bold
        text-4xl
        sm:text-5xl
        lg:text-6xl
        leading-tight
        tracking-tight
        text-[#111]
        "

      >

        {name}

      </h1>




      <p

        className="
        mt-5
        max-w-3xl
        text-base
        sm:text-lg
        leading-relaxed
        text-gray-600
        "

      >

        {description ||
          `Latest ${name} news, breaking developments, expert analysis and in-depth coverage from Nation Path.`}


      </p>



    </section>

  );

}