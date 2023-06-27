import { Configuration, OpenAIApi } from "openai";
import { Instruction } from "./instructions";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const openai = new OpenAIApi(configuration);

export async function openAIPolishProse(
  text: string,
  instructions: Instruction[]
): Promise<string> {
  const prompt = `Fix grammar and stylistic errors in the following text.
${formatInstructions(instructions)}
Return only corrected text. Do not write validation status.
If you don't see any errors in the provided text, return the provided text verbatim.
---
${text}
`;

  console.log("prompt", prompt);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [{ role: "user", content: prompt }],
  });
  const completionText = completion.data.choices[0].message?.content;
  return completionText || "";
}

function formatInstructions(instructions: Instruction[]): string {
  if (instructions.length === 0) {
    return "";
  }
  const instructionsBulletPoints = instructions
    .map((instruction) => {
      return `- ${instruction.prompt}`;
    })
    .join("\n");
  return `\nThe output text must be conformed to the following instructions:\n\n${instructionsBulletPoints}\n`;
}
