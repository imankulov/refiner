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
  | "highlight"
  | "markdown"
  | "bulletPoints";

export interface InstructionGroup {
  groupName: string;
  emoji: string;
  instructions: Instruction[];
}

export interface Instruction {
  name: InstructionName;
  title: string;
  prompt: string;
  emoji: string;
}

export const instructionGroups: InstructionGroup[] = [
  {
    groupName: "Tone",
    emoji: "🎭",
    instructions: [
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
    ],
  },
  {
    groupName: "Clarity",
    emoji: "🔎",
    instructions: [
      {
        name: "short",
        title: "Short",
        prompt:
          "Remove unnecessary words and repetitions. Replace long passages with shorter alternatives.",
        emoji: "🔪",
      },
      {
        name: "simple",
        title: "Simple",
        prompt:
          "Make the text simpler. Use simple language. Use shorter words and sentences.",
        emoji: "👶",
      },
    ],
  },
  {
    groupName: "Formatting",
    emoji: "📄",
    instructions: [
      {
        name: "emoji",
        title: "Emoji",
        prompt:
          "Find and insert emojis throughout the text to make it more expressive and easier to scan. Annotate with emojis sentences, phrases, and words that are important, surprising, or funny.",
        emoji: "😀",
      },
      {
        name: "highlight",
        title: "Highlight",
        prompt:
          "Use bold, italics, and other formatting to highlight important parts of the text. Use formatting to make the text easier to scan.",
        emoji: "🔦",
      },
      {
        name: "markdown",
        title: "Markdown",
        prompt:
          "Use Markdown to format the text. Format naked URLs as Markdown links unless they are part of the code block. Inline links in text, whenever it is possible and appropriate. When applicable, use appropriate link text. Wrap variables, file names, and other code in backticks.",
        emoji: "Ⓜ️",
      },
      {
        name: "bulletPoints",
        title: "Bullet Points",
        prompt: "Convert long paragraphs into bullet points.",
        emoji: "📝",
      },
    ],
  },
];

export const instructions: Instruction[] = instructionGroups.flatMap(
  (group) => group.instructions
);

export function getInstructions(
  instructionNames: InstructionName[]
): Instruction[] {
  return instructions.filter((instruction) =>
    instructionNames.includes(instruction.name)
  );
}
