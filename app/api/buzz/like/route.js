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

export async function PUT(req, res) {
  try {
    const updateData = await fetch(`${baseUrl}/updateOne`, {
      ...fetchOptions,
      body: JSON.stringify({
        ...fetchBody,
        filter: { _id: { "$old": req.body._id } },
        update: { [req.body.action]: { likes: req.body.userId } },
      }),
    });
    const updateDataJson = await updateData.json();
    console.log(updateDataJson);
    return NextResponse.json(updateDataJson);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
