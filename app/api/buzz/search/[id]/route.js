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

export async function GET(req, { params }) {
  const term = params.id;
  console.log(term);
  try {
    const readData = await fetch(`${baseUrl}/aggregate`, {
      ...fetchOptions,
      body: JSON.stringify({
        ...fetchBody,
        pipeline: [
          {
            $search: {
              index: "default",
              text: {
                query: term,
                path: {
                  wildcard: "*",
                },
                fuzzy: {},
              },
            },
          },
          { $sort: { postedAt: -1 } },
        ],
      }),
    });

    const readDataJson = await readData.json();
    return NextResponse.json(readDataJson.documents);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
