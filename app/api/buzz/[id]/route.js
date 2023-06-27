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

export async function DELETE(request, { params }) {
  const { id } = params;
  console.log(id);
  try {
    const deleteData = await fetch(`${baseUrl}/deleteOne`, {
      ...fetchOptions,
      body: JSON.stringify({
        ...fetchBody,
        filter: { _id: { $old: id } },
      }),
    });
    const deleteDataJson = await deleteData.json();
    return NextResponse.json(deleteDataJson);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
