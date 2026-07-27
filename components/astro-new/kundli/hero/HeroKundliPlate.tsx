"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HERO KUNDLI PLATE
//
// Final Royal Vedic Blueprint
//
// Visual Experience Layer Only
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

const houses = [
  { id: 1, x: 300, y: 72 },
  { id: 2, x: 215, y: 115 },
  { id: 3, x: 130, y: 180 },
  { id: 4, x: 75, y: 300 },
  { id: 5, x: 130, y: 420 },
  { id: 6, x: 215, y: 485 },
  { id: 7, x: 300, y: 528 },
  { id: 8, x: 385, y: 485 },
  { id: 9, x: 470, y: 420 },
  { id: 10, x: 525, y: 300 },
  { id: 11, x: 470, y: 180 },
  { id: 12, x: 385, y: 115 },
];

export default function HeroKundliPlate() {

  return (

    <motion.svg
      viewBox="0 0 600 600"
      className="h-full w-full"
      initial={{
        opacity:0,
        scale:0.95
      }}
      animate={{
        opacity:1,
        scale:1
      }}
      transition={{
        duration:1
      }}
    >

      <defs>

        <linearGradient
          id="goldMetal"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#F6DA8B"
          />

          <stop
            offset="50%"
            stopColor="#D4AF37"
          />

          <stop
            offset="100%"
            stopColor="#9A6800"
          />

        </linearGradient>


        <filter id="softGlow">

          <feGaussianBlur
            stdDeviation="2"
            result="blur"
          />

          <feMerge>

            <feMergeNode in="blur"/>

            <feMergeNode in="SourceGraphic"/>

          </feMerge>

        </filter>

      </defs>



      {/* Outer Brass Instrument Ring */}

      <circle
        cx="300"
        cy="300"
        r="278"
        fill="none"
        stroke="url(#goldMetal)"
        strokeWidth="3"
      />


      <circle
        cx="300"
        cy="300"
        r="258"
        fill="none"
        stroke="#8B5E00"
        strokeOpacity="0.25"
      />



      {/* Zodiac Engraving Points */}

      {
        Array.from({length:36}).map((_,i)=>{

          const angle =
            (i*10)
            *
            Math.PI/180;


          return (

            <circle
              key={i}
              cx={
                300+
                Math.cos(angle)*268
              }
              cy={
                300+
                Math.sin(angle)*268
              }
              r="1.8"
              fill="#8B5E00"
              opacity="0.7"
            />

          );

        })
      }




      {/* Kundli Body */}

      <g transform="translate(150 150)">


        <rect
          width="300"
          height="300"
          fill="#FFF9E8"
          fillOpacity="0.5"
          stroke="#8B5E00"
          strokeWidth="2.5"
        />


        {/* North Indian Diamond */}

        <path

          d="
          M150 0
          L300 150
          L150 300
          L0 150
          Z
          "

          fill="none"

          stroke="#6B4A16"

          strokeWidth="2.5"

        />



        {/* Diagonal Lines */}

        <path

          d="
          M0 0
          L300 300

          M300 0
          L0 300
          "

          stroke="#5A3908"

          strokeOpacity="0.55"

          strokeWidth="1.8"

        />



        {/* Inner Structure */}

        <path

          d="
          M150 0
          V300

          M0 150
          H300
          "

          stroke="#8B5E00"

          strokeOpacity="0.35"

        />



        {/* Sacred Center */}

        <circle

          cx="150"

          cy="150"

          r="34"

          fill="#D4AF37"

          opacity="0.12"

        />


        <circle

          cx="150"

          cy="150"

          r="8"

          fill="#8B5E00"

          filter="url(#softGlow)"

        />

      </g>




      {/* House Markers */}

      {
        houses.map((house)=>(

          <text

            key={house.id}

            x={house.x}

            y={house.y}

            textAnchor="middle"

            fill="#3B2600"

            fontSize="16"

            fontWeight="700"

          >

            {house.id}

          </text>

        ))
      }




      {/* Planet Energy */}

      {
        [
          [255,255],
          [345,255],
          [255,345],
          [345,345],
        ].map((p,i)=>(

          <circle

            key={i}

            cx={p[0]}

            cy={p[1]}

            r="5"

            fill="#D4AF37"

            stroke="#3B2600"

            strokeWidth="1"

          />

        ))
      }



    </motion.svg>

  );
}