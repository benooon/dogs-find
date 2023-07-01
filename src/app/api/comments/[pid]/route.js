
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const query = params.pid;
   const res = db.runQuery(query)
  console.log(res)
  return NextResponse.json(res);

  }