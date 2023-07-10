export type InstructionName =
  | "formal"
  | "casual"
  | "friendly"
  | "playful"
  | "professional"
  | "positive"
  | "short"
  | "simple"
  | "emoji"
  | "finish"
  | "markdown";

export interface Instruction {
  name: InstructionName;
  title: string;
  prompt: string;
  emoji: string;
}

export const instructions: Instruction[] = [
  {
    name: "formal",
    title: "Formal",
    prompt: "Make the text sound more formal.",
    emoji: "👔",
  },
  {
    name: "casual",
    title: "Casual",
    prompt: "Make the text sound more casual.",
    emoji: "👕",
  },
  {
    name: "friendly",
    title: "Friendly",
    prompt: "Make the text sound more friendly.",
    emoji: "👋",
  },
  {
    name: "playful",
    title: "Playful",
    prompt: "Make the text sound more playful.",
    emoji: "🎉",
  },
  {
    name: "professional",
    title: "Professional",
    prompt: "Make the text sound more professional.",
    emoji: "👩‍💼",
  },
  {
    name: "positive",
    title: "Positive",
    prompt: "Make the text sound more positive.",
    emoji: "🌞",
  },
  {
    name: "short",
    title: "Short",
    prompt: "Make the text shorter. Remove unnecessary words and repetitions.",
    emoji: "🔪",
  },
  {
    name: "simple",
    title: "Simple",
    prompt:
      "Make the text simpler. Use simple language. Use shorter words and sentences.",
    emoji: "👶",
  },
  {
    name: "emoji",
    title: "Emoji",
    prompt: "Insert emojis to make the text more expressive.",
    emoji: "😀",
  },
  {
    name: "finish",
    title: "Finish",
    prompt:
      "Finish the sentence. Update the text by replacing the XXX placeholders with suitable words or phrases that match the context and finish the sentence.",
    emoji: "🔚",
  },
  {
    name: "markdown",
    title: "Markdown",
    prompt:
      "Use Markdown to format the text. Format naked URLs as Markdown links unless they are part of the code block. Inline links in text, whenever it is possible and appropriate. When applicable, use appropriate link text. Wrap variables, file names, and other code in backticks.",
    emoji: "Ⓜ️",
  },
];

export function getInstructions(
  instructionNames: InstructionName[]
): Instruction[] {
  return instructions.filter((instruction) =>
    instructionNames.includes(instruction.name)
  );
}
