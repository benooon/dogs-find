import { NextResponse } from 'next/server';

const db = require('../../db');


export async function POST(request) {
    const res = await request.json() 
    db.insertJsonIntoMongoDB(res)
    console.log(res)
    return NextResponse.json(res);
  }
  export async function GET(request) {
    const res = {test: 'test'}
    console.log(res)
    return NextResponse.json(res);
  }
