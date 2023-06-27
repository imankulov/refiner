import { mockPolishProse } from "./mockPolisher";
import { openAIPolishProse } from "./openaiPolisher";
import { Tone } from "./tones";

export async function polishProse(
  text: string,
  tones: Tone[]
): Promise<string> {
  if (process.env.POLISHER === "openai") {
    return openAIPolishProse(text, tones);
  } else {
    return mockPolishProse(text, tones);
  }
}
