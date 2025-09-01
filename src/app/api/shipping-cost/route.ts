/* eslint-disable no-console */
import { NextResponse } from "next/server";

// Handle POST request
export async function POST(req: Request) {
  try {
    const { origin, destination, weight, courier } = await req.json();

    // Prepare the form data for Rajaongkir API
    const formData = new URLSearchParams({
      origin,
      destination,
      weight: String(weight),
      courier,
    });

    const apiKey = process.env.NEXT_PUBLIC_RAJAONGKIR_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    // Send the request to Rajaongkir API
    const response = await fetch("https://api.rajaongkir.com/starter/cost", {
      method: "POST",
      headers: {
        key: apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    // !! DEBUGGING ONLY
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      // !! DEBUGGING ONLY
      console.error("API error response:", errorText);
      throw new Error("Failed to fetch shipping cost");
    }

    // Parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error("Error parsing response JSON:", jsonError);
      return NextResponse.json(
        { error: "Failed to parse response JSON" },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to calculate shipping cost" },
      { status: 500 }
    );
  }
}

// Optionally handle GET requests (or block them)
export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
