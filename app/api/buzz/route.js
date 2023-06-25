import { NextResponse } from "next/server";

const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": process.env.MONGODB_DATA_API_KEY,
  },
};
const fetchBody = {
  dataSource: process.env.MONGODB_DATA_SOURCE,
  database: "social_buzz",
  collection: "buzzes",
};
const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

export async function GET(req, res) {
  try {
    const readData = await fetch(`${baseUrl}/find`, {
      ...fetchOptions,
      body: JSON.stringify({ ...fetchBody, sort: { _id: -1 } }),
    });
    const readDataJson = await readData.json();
    return NextResponse.json(readDataJson.documents);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req, res) {
  try {
    const buzz = await req.json();
    const insertData = await fetch(`${baseUrl}/insertOne`, {
      ...fetchOptions,
      body: JSON.stringify({ ...fetchBody, document: buzz }),
    });
    const insertDataJson = await insertData.json();
    return NextResponse.json(insertDataJson);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
