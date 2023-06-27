import { Configuration, OpenAIApi } from "openai";
import { Tone } from "./tones";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const openai = new OpenAIApi(configuration);

export async function openAIPolishProse(
  text: string,
  tones: Tone[]
): Promise<string> {
  const toneClause = tones.map((tone) => tone.prompt).join(" ");
  const prompt = `Fix grammar and stylistic errors in the following text. ${toneClause}
Return only corrected text. Do not write validation status.
If you don't see any errors in the provided text, return the provided text verbatim.
---
${text}
`;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [{ role: "user", content: prompt }],
  });
  const completionText = completion.data.choices[0].message?.content;
  return completionText || "";
}
