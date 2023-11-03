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
  | "bulletPoints"
  | "emailText"
  | "chatMessageText"
  | "gitCommitMessageText"
  | "codeReviewText";

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
          "Find and insert emojis throughout the text to make it more expressive and easier to scan. \
          Annotate with emojis sentences, phrases, and words that are important, surprising, or funny.",
        emoji: "😀",
      },
      {
        name: "highlight",
        title: "Highlight",
        prompt:
          "Use bold, italics, and other formatting to highlight important parts of the text. Use formatting to make the \
          text easier to scan.",
        emoji: "🔦",
      },
      {
        name: "markdown",
        title: "Markdown",
        prompt:
          "Use Markdown to format the text. Format naked URLs as Markdown links unless they are part of the code block. \
          Inline links in text, whenever it is possible and appropriate. When applicable, use appropriate link text. \
          Wrap variables, file names, and other code in backticks.",
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
  {
    groupName: "Context",
    emoji: "🙊",
    instructions: [
      {
        name: "emailText",
        title: "Email",
        prompt: "Treat provided text as an email.",
        emoji: "📧",
      },
      {
        name: "chatMessageText",
        title: "Chat Message",
        prompt:
          "Treat provided text as a chat message. Make it sound professional yet friendly. \
          Make sure it's clear, concise, and polite. Use emojis sparingly if necessary.",
        emoji: "💬",
      },
      {
        name: "gitCommitMessageText",
        title: "Git Commit Message",
        prompt:
          "Treat provided text as a git commit message. Ensure it's formatted with a short summary line, \
          followed by a blank line, followed by a more detailed description. \
          Ensure that the summary line is less than 50 characters. Ensure that the lines in the description are less than 72 characters. \
          Avoid using past tense, and use the imperative mood instead.",
        emoji: "🌱",
      },
      {
        name: "codeReviewText",
        title: "Code Review",
        prompt:
          "Treat provided text as a code review. Be kind, specific, and constructive. When suggesting improvements, don't command. \
          Discuss code, not character. Keep it friendly and professional. Be concise. Use emojis sparingly if necessary.",
        emoji: "👩‍💻",
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
