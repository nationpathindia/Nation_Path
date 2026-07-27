import type { Metadata } from "next";


export const metadata: Metadata = {

  title:
    "NationPath Kids",

  description:
    "Future learning platform by NationPath India.",

};



export default function KidsLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  return (

    <>

      {children}

    </>

  );


}