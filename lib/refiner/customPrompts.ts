type CustomPromptFn = (text: string) => string | undefined;

export function getCustomPrompts(text: string): string {
  const customPrompts = allCustomPromptFunctions
    .map((fn) => fn(text))
    .filter((prompt) => prompt !== undefined) as string[];
  return customPrompts.join("\n");
}

const dontDeleteMarkdownImages: CustomPromptFn = (text) => {
  const hasImages = text.includes("![");
  if (hasImages) {
    return "- Do not delete Markdown images.";
  }
};

const allCustomPromptFunctions: CustomPromptFn[] = [dontDeleteMarkdownImages];
