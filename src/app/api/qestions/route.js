import { NextResponse } from 'next/server';
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

export async function GET(req) {
    const db = await runQuery({})
    const data = await db.json();

    return NextResponse.json(data);
  }