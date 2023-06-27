export type InstructionName =
  | "formal"
  | "casual"
  | "friendly"
  | "playful"
  | "professional"
  | "positive"
  | "short"
  | "bulletPoints"
  | "simple";

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
    name: "bulletPoints",
    title: "Bullet Points",
    prompt: "Use bullet points to make the text easier to read.",
    emoji: "📝",
  },
  {
    name: "simple",
    title: "Simple",
    prompt:
      "Make the text simpler. Use simple language. Use shorter words and sentences.",
    emoji: "👶",
  },
];

export function getInstructions(
  instructionNames: InstructionName[]
): Instruction[] {
  return instructions.filter((instruction) =>
    instructionNames.includes(instruction.name)
  );
}
