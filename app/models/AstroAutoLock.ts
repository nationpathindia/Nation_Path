//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO AUTOMATION
//
// ASTRO AUTO LOCK MODEL
//
// Purpose:
// Prevent duplicate Astro background generation
//
// Used By:
// - Daily Horoscope Automation
// - Future Astro Workers
//
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";


const AstroAutoLockSchema = new Schema(
{

  key: {

    type: String,

    required: true,

    unique: true,

  },


  createdAt: {

    type: Date,

    default: Date.now,

  },


  expiresAt: {

    type: Date,

    required: true,

  },


},

{
  timestamps: true,
}

);



const AstroAutoLock: Model<any> =

  mongoose.models.AstroAutoLock ||

  mongoose.model(

    "AstroAutoLock",

    AstroAutoLockSchema

  );



export default AstroAutoLock;