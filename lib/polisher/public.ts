import { mockPolishProse } from "./mockPolisher";
import { openAIPolishProse } from "./openaiPolisher";
import { Instruction } from "./instructions";

export async function polishProse(
  text: string,
  instructions: Instruction[]
): Promise<string> {
  if (process.env.POLISHER === "openai") {
    return openAIPolishProse(text, instructions);
  } else {
    return mockPolishProse(text, instructions);
  }
}
