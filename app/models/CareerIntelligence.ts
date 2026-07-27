import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";


//////////////////////////////////////////////////////
// TYPE
//////////////////////////////////////////////////////

export interface ICareerIntelligence extends Document {

  title: string;

  slug: string;

  category: string;

  careerType: string;


  planets: string[];

  zodiacSigns: string[];

  houses: string[];


  professions: string[];

  industries: string[];

  skills: string[];


  strengths: string[];

  challenges: string[];


  careerGrowth: string;

  business: string;

  job: string;


  interpretation: string;

  remedies: string;



  media: {

    image: string;

    icon: string;

    video: string;

  };



  seo: {

    title: string;

    description: string;

    keywords: string[];

  };



  status: "draft" | "published";


  createdAt: Date;

  updatedAt: Date;

}



//////////////////////////////////////////////////////
// SCHEMA
//////////////////////////////////////////////////////

const CareerIntelligenceSchema =
  new Schema<ICareerIntelligence>(


    {


      title: {

        type: String,

        required: true,

      },



      slug: {

        type: String,

        required: true,

        unique: true,

        index: true,

      },



      category: {

        type: String,

        default: "career",

      },



      careerType: {

        type: String,

        default: "general",

      },




      planets: [

        {

          type: String,

        }

      ],



      zodiacSigns: [

        {

          type: String,

        }

      ],



      houses: [

        {

          type: String,

        }

      ],




      professions: [

        {

          type: String,

        }

      ],



      industries: [

        {

          type: String,

        }

      ],



      skills: [

        {

          type: String,

        }

      ],




      strengths: [

        {

          type: String,

        }

      ],



      challenges: [

        {

          type: String,

        }

      ],




      careerGrowth: {

        type: String,

        default: "",

      },



      business: {

        type: String,

        default: "",

      },



      job: {

        type: String,

        default: "",

      },




      interpretation: {

        type: String,

        default: "",

      },



      remedies: {

        type: String,

        default: "",

      },




      media: {


        image: {

          type: String,

          default: "",

        },


        icon: {

          type: String,

          default: "",

        },


        video: {

          type: String,

          default: "",

        },


      },





      seo: {


        title: {

          type: String,

          default: "",

        },


        description: {

          type: String,

          default: "",

        },


        keywords: [

          {

            type: String,

          }

        ],


      },






      status: {


        type: String,


        enum: [

          "draft",

          "published"

        ],


        default: "draft",


      },



    },


    {

      timestamps: true,

    }


  );





//////////////////////////////////////////////////////
// MODEL
//////////////////////////////////////////////////////

const CareerIntelligence =
  (mongoose.models.CareerIntelligence as Model<ICareerIntelligence>) ||
  mongoose.model<ICareerIntelligence>(
    "CareerIntelligence",
    CareerIntelligenceSchema
  );



export default CareerIntelligence;