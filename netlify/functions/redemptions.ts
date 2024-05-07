import express, { Router } from "express"
import serverless from "serverless-http";

// This will help us connect to the database

// This help convert the id from string to ObjectId for the _id.
import { MongoClient, ObjectId } from "mongodb"

const mongoClient = new MongoClient(Netlify.env.get('REACT_APP_ATLAS_URI') ?? '');

const clientPromise = mongoClient.connect();
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /reward.

const api = express();

const router = Router();


// This section will help you get a list of all the reward.
router.get("/", async (req, res) => {
  const db= (await clientPromise).db(process.env.MONGODB_DATABASE); 
  let collection = await db.collection("rewards");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single reward by id
router.get("/:id", async (req, res) => {
  const db= (await clientPromise).db(process.env.MONGODB_DATABASE); 
  let collection = await db.collection("rewards");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new reward.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    };
    const db= (await clientPromise).db(process.env.MONGODB_DATABASE); 
    let collection = await db.collection("rewards");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding reward");
  }
});

// This section will help you update a reward by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
      },
    };

    const db= (await clientPromise).db(process.env.MONGODB_DATABASE); 
    let collection = await db.collection("rewards");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating reward");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const db= (await clientPromise).db(process.env.MONGODB_DATABASE); 
    const collection = db.collection("rewards");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting reward");
  }
});

api.use("/redemptions/", router);

export const handler = serverless(api);