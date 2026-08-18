"use client";

import {
  Activity,
  BookOpen,
  Eye,
  MousePointerClick,
} from "lucide-react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export interface AnalyticsTrafficPoint {
  label: string;
  views?: number;
  reads?: number;
  opens?: number;
}


interface AnalyticsTrafficChartProps {
  data?: AnalyticsTrafficPoint[];
  title?: string;
  description?: string;
}


function number(value?: number) {
  return Number(value) || 0;
}


function formatNumber(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toLocaleString("en-IN");
}


function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
  }>;
  label?: string;
}) {

  if (!active || !payload?.length) {
    return null;
  }


  const labels: Record<string,string> = {
    views:"Views",
    reads:"Reads",
    opens:"Opens",
  };


  return (
    <div className="
      min-w-[160px]
      rounded-xl
      border
      border-white/10
      bg-[#080D18]/95
      px-4
      py-3
      shadow-2xl
      backdrop-blur-xl
    ">

      <p className="
        mb-3
        text-[10px]
        uppercase
        tracking-[0.12em]
        text-gray-500
      ">
        {label}
      </p>


      <div className="space-y-2">

        {payload.map((item)=>(
          <div
            key={item.dataKey}
            className="
              flex
              items-center
              justify-between
              gap-6
            "
          >

            <span className="text-xs text-gray-400">
              {labels[item.dataKey || ""]}
            </span>


            <span className="
              text-xs
              font-semibold
              text-white
            ">
              {formatNumber(number(item.value))}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}



function SummaryCard({
  icon:Icon,
  label,
  value,
  accent,
}:{
  icon:any;
  label:string;
  value:number;
  accent:string;
}){

  return (
    <div className="
      rounded-lg
      border
      border-white/[0.07]
      bg-white/[0.025]
      px-3
      py-2.5
      min-w-[72px]
    ">

      <div className="
        flex
        items-center
        gap-1.5
      ">

        <Icon
          size={12}
          strokeWidth={2}
          className={accent}
        />

        <span className="
          text-[10px]
          uppercase
          tracking-wider
          text-gray-500
        ">
          {label}
        </span>

      </div>


      <p className="
        mt-1
        text-sm
        font-bold
        text-white
        tabular-nums
      ">
        {formatNumber(value)}
      </p>

    </div>
  );
}
export default function AnalyticsTrafficChart({
  data = [],
  title = "Content Traffic",
  description = "Views, opens and reads across the selected analytics window.",
}: AnalyticsTrafficChartProps) {


  const chartData = data.map((item)=>({
    label:item.label,
    views:number(item.views),
    reads:number(item.reads),
    opens:number(item.opens),
  }));


  const totalViews = chartData.reduce(
    (sum,item)=>sum + item.views,
    0
  );


  const totalReads = chartData.reduce(
    (sum,item)=>sum + item.reads,
    0
  );


  const totalOpens = chartData.reduce(
    (sum,item)=>sum + item.opens,
    0
  );



  return (

    <section className="
      relative
      overflow-hidden
      rounded-xl
      border
      border-white/[0.08]
      bg-white/[0.035]
      p-4
      shadow-inner
      backdrop-blur-xl
      md:p-5
    ">


      {/* premium glow */}

      <div className="
        pointer-events-none
        absolute
        right-0
        top-0
        h-36
        w-36
        rounded-full
        bg-orange-500/10
        blur-3xl
      "/>



      {/* HEADER */}

      <div className="
        relative
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-start
        md:justify-between
      ">


        <div>

          <div className="
            flex
            items-center
            gap-2
          ">

            <div className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-orange-500/10
            ">

              <Activity
                size={14}
                strokeWidth={1.8}
                className="text-orange-400"
              />

            </div>


            <div>

              <h2 className="
                text-base
                font-semibold
                text-white
              ">
                {title}
              </h2>

            </div>


            <span className="
              ml-1
              flex
              items-center
              gap-1
              rounded-full
              border
              border-emerald-400/20
              bg-emerald-400/10
              px-2
              py-0.5
              text-[9px]
              font-medium
              uppercase
              tracking-wide
              text-emerald-400
            ">

              <span className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
              "/>

              Live

            </span>


          </div>



          <p className="
            mt-1
            text-xs
            text-gray-500
          ">
            {description}
          </p>


        </div>



        {/* SUMMARY */}

        <div className="
          flex
          gap-2
        ">

          <SummaryCard
            icon={Eye}
            label="Views"
            value={totalViews}
            accent="text-orange-400"
          />


          <SummaryCard
            icon={BookOpen}
            label="Reads"
            value={totalReads}
            accent="text-emerald-400"
          />


          <SummaryCard
            icon={MousePointerClick}
            label="Opens"
            value={totalOpens}
            accent="text-blue-400"
          />


        </div>


      </div>





      {/* CHART */}

      <div className="
        mt-6
        h-[280px]
        w-full
      ">


        {chartData.length === 0 ? (

          <div className="
            flex
            h-full
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-white/10
          ">

            <p className="
              text-sm
              text-gray-500
            ">
              No traffic data available.
            </p>

          </div>


        ) : (


          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={chartData}
              margin={{
                top:15,
                right:10,
                left:-20,
                bottom:5,
              }}
            >


              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />



              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:"#6B7280",
                  fontSize:11,
                }}
              />



              <YAxis
                axisLine={false}
                tickLine={false}
                width={45}
                tick={{
                  fill:"#6B7280",
                  fontSize:11,
                }}
                tickFormatter={(v)=>
                  formatNumber(Number(v))
                }
              />



              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke:"rgba(255,255,255,0.12)",
                }}
              />



              <Legend
                verticalAlign="top"
                align="right"
                height={28}
                iconType="circle"
                wrapperStyle={{
                  fontSize:"11px",
                  color:"#9CA3AF",
                }}
              />



              <Line
                type="monotone"
                dataKey="views"
                stroke="#EA661B"
                strokeWidth={2.4}
                dot={false}
                activeDot={{
                  r:4,
                }}
                animationDuration={800}
              />



              <Line
                type="monotone"
                dataKey="reads"
                stroke="#34D399"
                strokeWidth={2.2}
                dot={false}
                activeDot={{
                  r:4,
                }}
                animationDuration={900}
              />



              <Line
                type="monotone"
                dataKey="opens"
                stroke="#6D91D8"
                strokeWidth={2.2}
                dot={false}
                activeDot={{
                  r:4,
                }}
                animationDuration={1000}
              />


            </LineChart>


          </ResponsiveContainer>


        )}


      </div>


    </section>

  );
}