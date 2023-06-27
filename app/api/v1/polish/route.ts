import { polishProse } from "@/lib/polisher/public";
import { InstructionName, getInstructions } from "@/lib/polisher/instructions";
import { NextResponse } from "next/server";

interface RequestJSON {
  text?: string;
  instructionNames: InstructionName[];
}

export async function POST(request: Request) {
  const body: RequestJSON = await request.json();
  const { text, instructionNames } = body;
  if (!text) {
    return NextResponse.json({ error: "No text provided" });
  }
  const instructions = getInstructions(instructionNames);
  const polished = await polishProse(text, instructions);
  return NextResponse.json({ text, polished });
}
