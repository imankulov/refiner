import { Configuration, OpenAIApi } from "openai";
import { Instruction } from "./instructions";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const openai = new OpenAIApi(configuration);

export async function openAIRefineText(
  text: string,
  instructions: Instruction[]
): Promise<string> {
  const prompt = `Fix grammar and stylistic errors in the text provided below.

The output text must conform to the following instructions:

${formatInstructions(instructions)}
- Return only corrected text. Do not write validation status.
- Keep the output language the same as the input language. Do not translate the text.
- Do not add any information that is not present in the input text.
- If you don't see any errors in the provided text and there is nothing to fix, return the provided text verbatim.
`;

  const formattedText = `
${text}
`;

  console.log("prompt", prompt);
  console.log("formattedText", formattedText);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    temperature: 0,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: formattedText },
    ],
  });
  const completionText = completion.data.choices[0].message?.content;
  return completionText || "";
}

function formatInstructions(instructions: Instruction[]): string {
  return instructions
    .map((instruction) => {
      return `- ${instruction.prompt}`;
    })
    .join("\n");
}
