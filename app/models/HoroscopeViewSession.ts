//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO LIVE VIEW TRACKING
//
// HOROSCOPE VIEW SESSION MODEL
//
// Purpose:
// Track currently active horoscope readers
//
// Flow:
//
// Visitor opens horoscope page
//        ↓
// Session created / updated
//        ↓
// lastActive refreshed
//        ↓
// Admin dashboard reads active viewers
//
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";


const HoroscopeViewSessionSchema = new Schema(

{

  sessionId: {

    type: String,

    required: true,

    unique: true,

  },


  zodiac: {

    type: String,

    required: true,

    lowercase: true,

    trim: true,

  },


  slug: {

    type: String,

    required: true,

    trim: true,

  },


  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: false,

  },


  lastActive: {

    type: Date,

    default: Date.now,

  },


  createdAt: {

    type: Date,

    default: Date.now,

  },


},

{

  timestamps:true,

}

);



// Fast lookup for active users
//
// Active visitor:
//
// lastActive >= now - 5 minutes
//

HoroscopeViewSessionSchema.index({

  lastActive:1

});



const HoroscopeViewSession: Model<any> =


mongoose.models.HoroscopeViewSession ||


mongoose.model(

  "HoroscopeViewSession",

  HoroscopeViewSessionSchema

);



export default HoroscopeViewSession;