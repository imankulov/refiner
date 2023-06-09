import { mockPolishProse } from "./mockPolisher";
import { openAIPolishProse } from "./openaiPolisher";

export async function polishProse(text: string): Promise<string> {
  if (process.env.POLISHER === "openai") {
    return openAIPolishProse(text);
  } else {
    return mockPolishProse(text);
  }
}
