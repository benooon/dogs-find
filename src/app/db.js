

const { MongoClient, ServerApiVersion } = require('mongodb');

const dotenv = require('dotenv');
const uri = process.env.MONGO_URL

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function runQuery(query) {
    let client; // Declare the 'client' variable outside the try-catch block
  
    try {
      client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
  
      // Connect to the MongoDB server
      await client.connect();
  
      // Access the database and collection
      const db = client.db('yuval-zak');
      const collection = db.collection('qestions');
  
      // Execute the query
      const result = await collection.find(query).toArray();
  
      // Return the result
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      // Close the MongoDB connection
      if (client) {
        await client.close();
      }
    }
  }

  async function insertJsonIntoMongoDB(json) {
    let client; // Declare the 'client' variable outside the try-catch block

    client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
  
  
    try {
      await client.connect();
  
      const database = client.db('yuval-zak'); // Replace with your database name
      const collection = database.collection('comments'); // Replace with your collection name
  
      // Insert the JSON object into the collection
      const result = await collection.insertOne(json);
      console.log('Document inserted with _id:', result.insertedId);
    } finally {
      await client.close();
    }
  }
  module.exports = {
runQuery,insertJsonIntoMongoDB
  };
  