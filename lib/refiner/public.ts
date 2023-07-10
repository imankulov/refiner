import { mockRefineText } from "./mockRefiner";
import { openAIRefineText } from "./openaiRefiner";
import { Instruction } from "./instructions";

const defaultRefiner = "openai";

export async function refineText(
  text: string,
  instructions: Instruction[]
): Promise<string> {
  const refiner = process.env.REFINER ?? defaultRefiner;
  if (refiner === "openai") {
    return openAIRefineText(text, instructions);
  } else {
    return mockRefineText(text, instructions);
  }
}
