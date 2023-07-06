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
  collection: "users",
};
const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

export async function GET(req, { params }) {
  const { id } = params;
  console.log(id);
  try {
    const readData = await fetch(`${baseUrl}/findOne`, {
      ...fetchOptions,
      body: JSON.stringify({ ...fetchBody, filter: { _id: { $oid: id } } }),
    });
    const readDataJson = await readData.json();
    console.log(readDataJson);
    return NextResponse.json(readDataJson);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
