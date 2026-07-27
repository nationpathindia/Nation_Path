//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO VIMSHOTTARI DASHA ENGINE
//////////////////////////////////////////////////////////////


export interface DashaPeriod {

  planet:string;

  years:number;

}



export interface MahadashaResult {

  planet:string;

  start:Date;

  end:Date;

  years:number;

  antardasha?:AntardashaResult[];

}



export interface AntardashaResult {

  planet:string;

  start:Date;

  end:Date;

  years:number;

}



export interface CurrentDashaResult {

  mahadasha:string;

  antardasha:string;

  start:Date;

  end:Date;

}





const DASHA_SEQUENCE:DashaPeriod[] = [


  {
    planet:"Ketu",
    years:7
  },


  {
    planet:"Venus",
    years:20
  },


  {
    planet:"Sun",
    years:6
  },


  {
    planet:"Moon",
    years:10
  },


  {
    planet:"Mars",
    years:7
  },


  {
    planet:"Rahu",
    years:18
  },


  {
    planet:"Jupiter",
    years:16
  },


  {
    planet:"Saturn",
    years:19
  },


  {
    planet:"Mercury",
    years:17
  },


];





const TOTAL_YEARS = 120;





function addYears(
  date:Date,
  years:number
):Date {


  const result =
    new Date(date);



  result.setFullYear(

    result.getFullYear() + years

  );


  return result;

}





function addMonths(
  date:Date,
  months:number
):Date {


  const result =
    new Date(date);



  result.setMonth(

    result.getMonth() + months

  );


  return result;

}







//////////////////////////////////////////////////////////////
// MAHADASHA ENGINE
//////////////////////////////////////////////////////////////


export function calculateVimshottariMahadasha(

  birthDate:Date,

  nakshatraLord:string


):MahadashaResult[] {



  const startIndex =

    DASHA_SEQUENCE.findIndex(

      item =>
        item.planet === nakshatraLord

    );



  if(startIndex === -1){

    throw new Error(
      "Invalid Nakshatra Lord"
    );

  }




  const sequence = [

    ...DASHA_SEQUENCE.slice(startIndex),

    ...DASHA_SEQUENCE.slice(0,startIndex)

  ];





  let currentDate =

    new Date(birthDate);




  const result:MahadashaResult[]=[];





  for(const dasha of sequence){



    const endDate =

      addYears(

        currentDate,

        dasha.years

      );




    result.push({

      planet:

        dasha.planet,


      start:

        currentDate,


      end:

        endDate,


      years:

        dasha.years,


    });




    currentDate =

      endDate;


  }




  return result;


}








//////////////////////////////////////////////////////////////
// ANTARDASHA ENGINE
//////////////////////////////////////////////////////////////


export function calculateAntardasha(

  mahadasha:MahadashaResult


):AntardashaResult[] {



  const result:AntardashaResult[]=[];



  let currentDate =

    new Date(
      mahadasha.start
    );




  for(const dasha of DASHA_SEQUENCE){



    const years =

      (

        mahadasha.years *

        dasha.years

      )

      /

      TOTAL_YEARS;





    const months =

      Math.round(

        years * 12

      );





    const endDate =

      addMonths(

        currentDate,

        months

      );





    result.push({

      planet:

        dasha.planet,


      start:

        currentDate,


      end:

        endDate,


      years,


    });





    currentDate =

      endDate;



  }




  return result;


}









//////////////////////////////////////////////////////////////
// CURRENT DASHA FINDER
//////////////////////////////////////////////////////////////


export function getCurrentDasha(

  mahadashas:MahadashaResult[]

):

CurrentDashaResult|null {



  const today =

    new Date();





  for(const maha of mahadashas){



    if(

      today >= maha.start &&

      today <= maha.end

    ){



      const antardashas =

        calculateAntardasha(

          maha

        );





      for(const antar of antardashas){



        if(

          today >= antar.start &&

          today <= antar.end

        ){



          return {


            mahadasha:

              maha.planet,



            antardasha:

              antar.planet,



            start:

              antar.start,



            end:

              antar.end,


          };


        }


      }




      return {


        mahadasha:

          maha.planet,


        antardasha:

          "Unknown",


        start:

          maha.start,


        end:

          maha.end,


      };



    }


  }





  return null;


}
