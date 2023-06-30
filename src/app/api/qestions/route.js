import { NextResponse } from 'next/server';
const db = require('../../db');


export async function GET() {
    const dbA = await db.runQuery({})
    return NextResponse.json(dbA);
  }