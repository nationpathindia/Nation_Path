import React from "react";

import AstroSidebar from "@/components/astro/dashboard/AstroSidebar";
import AstroDashboardHeader from "@/components/astro/dashboard/AstroDashboardHeader";


//////////////////////////////////////////////////////////////
// NATIONPATH CORE DASHBOARD LAYOUT
//
// Shared Dashboard Shell
//
// Future Support:
// - Astro
// - Kids
// - Premium Products
//////////////////////////////////////////////////////////////


export default function DashboardLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  return (

    <div
      className="
      min-h-screen
      bg-[#070B1A]
      text-white
      "
    >



      {/* Sidebar */}

      <AstroSidebar />





      {/* Main Content */}

      <div
        className="
        ml-72
        min-h-screen
        "
      >




        {/* Header */}

        <AstroDashboardHeader

          userName="Rahul Sharma"

          plan="Premium"

          role="Premium Member"

          notifications={3}

        />





        {/* Page Content */}

        <main
          className="
          p-6
          md:p-8
          "
        >

          {children}

        </main>



      </div>



    </div>

  );

}