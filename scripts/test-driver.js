require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi:{
    version: ServerApiVersion.v1,
    strict:true,
    deprecationErrors:true,
  }
});


async function run(){

 try{

  console.log("Connecting...");

  await client.connect();

  await client.db("admin").command({
    ping:1
  });

  console.log(
    "Mongo Driver Connected ✅"
  );


 }catch(error){

  console.error(
    "Mongo Driver Error ❌",
    error
  );


 }finally{

  await client.close();

 }

}


run();