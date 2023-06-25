import { NextResponse } from "next/server";

export async function GET(req, res) {
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

  try {
    const readData = await fetch(`${baseUrl}/find`, {
      ...fetchOptions,
      body: JSON.stringify({ ...fetchBody, sort: { postedAT: -1 } }),
    });
    const readDataJson = await readData.json();
    return NextResponse.json(readDataJson.documents);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
