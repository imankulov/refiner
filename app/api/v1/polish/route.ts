import { polishProse } from "@/lib/polisher/public";
import { NextResponse } from "next/server";

interface RequestJSON {
  text?: string;
}

export async function POST(request: Request) {
  const body: RequestJSON = await request.json();
  const { text } = body;
  if (!text) {
    return NextResponse.json({ error: "No text provided" });
  }
  const polished = await polishProse(text);
  return NextResponse.json({ text, polished });
}
