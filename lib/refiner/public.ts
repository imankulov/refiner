import { mockRefineText } from "./mockRefiner";
import { openAIRefineText } from "./openaiRefiner";
import { Instruction } from "./instructions";

export async function refineText(
  text: string,
  instructions: Instruction[]
): Promise<string> {
  if (process.env.REFINER === "openai") {
    return openAIRefineText(text, instructions);
  } else {
    return mockRefineText(text, instructions);
  }
}
