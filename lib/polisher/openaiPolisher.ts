import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const openai = new OpenAIApi(configuration);

export async function openAIPolishProse(text: string): Promise<string> {
  const prompt = `Fix grammar and stylistic errors in the following text.
Return only corrected text. Do not write validation status.
If you don't see any errors in the provided text, return the provided text verbatim.
---
${text}
`;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  const completionText = completion.data.choices[0].message?.content;
  return completionText || "";
}
