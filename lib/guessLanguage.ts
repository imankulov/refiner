import { languageDetector } from "./refiner/openaiRefiner";

/**
 * Guesses the language of the given text.
 *
 * @param text The text to guess the language of.
 * @returns The name of the guessed language, or undefined if no language was detected with sufficient probability. The probability threshold is 0.1.p
 */
export function guessLanguage(text: string): string | undefined {
  const results = languageDetector.detect(text, 1);

  if (results.length === 0) {
    return undefined;
  }
  const [languageName, prob] = results[0];
  if (prob < 0.1) {
    return undefined;
  }
  return languageName;
}
