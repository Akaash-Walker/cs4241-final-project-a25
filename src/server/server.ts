// to read from env file
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const result = dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express from 'express';
import router from "./routes.ts";
import { MongoClient, ServerApiVersion} from "mongodb"
const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// using the router for all /api routes
app.use('/api', router);

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

//const { MongoClient, ServerApiVersion } = require('mongodb');
//const username = process.env.USERNM as string
//const password = process.env.PASS as string
//const host = process.env.HOST as string
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=myCluster`;
//const uri = `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority&appName=myCluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection: any
collection = null

//each document for each user
// each document has objects of artist and place of origin

async function run() {
  //console.log("Welcome " + process.env.USERNM);
  try {
      // Connect the client to the server	(optional starting in v4.7)
      // Anonymous function will print errors to the console related to that database
      try {
        await client.connect();
          console.log("Connected successfully");
        } catch (err) {
          console.error("Connection error:", err);
          await client.close();
      }

      
      // Send a ping to confirm a successful connection
      await client.db("myDatabase").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }
    catch(err){
      console.log("Could not ping");
    }

    app.get("/docs", async (req, res) => {

        if (collection !== null) {
            const docs = await collection.find({}).toArray()
            res.json( docs )
        }
    })
}
run().catch(console.dir);

//Called to load everything passed in, into each user's database
app.post("/load", async (req, res) =>{
  const data = req.body.list; 
  
  for (var i = 0; i < data.length; i++){
    //Find what user we are dealing with
    const colName = data[i].userId; //Possible placeholder, wait for what constitutes the doc name
    //Switch to said collection
    collection = client.db("myDatabase").collection(colName);

    //All the documents in that user's data
    //const docs = await collection.find({}).toArray();

    //All the passed in last listened to artists
    const listenedArtists = data[i].recentlyListened;

    for (var n = 0; n < listenedArtists.length; n++){
      const checkArtist = await collection.findOne({name: listenedArtists[i].artistId})

      //If the current artist has not been logged in the collection
      if (!checkArtist){
        await collection.insertOne({name: listenedArtists[i].artistId, country: listenedArtists[i].country});
      }
    }


  }//await collection.insertOne({artist: });

})
