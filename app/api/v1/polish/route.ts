import { polishProse } from "@/lib/polisher/public";
import { ToneName, getTones } from "@/lib/polisher/tones";
import { NextResponse } from "next/server";

interface RequestJSON {
  text?: string;
  toneNames: ToneName[];
}

export async function POST(request: Request) {
  const body: RequestJSON = await request.json();
  const { text, toneNames } = body;
  if (!text) {
    return NextResponse.json({ error: "No text provided" });
  }
  const tones = getTones(toneNames);
  const polished = await polishProse(text, tones);
  return NextResponse.json({ text, polished });
}
