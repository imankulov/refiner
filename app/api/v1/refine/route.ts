import { refineText } from "@/lib/refiner/public";
import { InstructionName, getInstructions } from "@/lib/refiner/instructions";
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
  const refined = await refineText(text, instructions);
  return NextResponse.json({ text, refined: refined });
}
