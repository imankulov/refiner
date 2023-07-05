import { InstructionName } from "@/lib/refiner/instructions";
import { atomWithStorage } from "jotai/utils";

const DEMO_TEXT = `Welcome to Refiner. 

Refiner improves your writings. It corrects grammar issues, adjusts tone, and offers formatting options. 
I found it useful for non-native speakers and professionals who communicate with text.

Here's a quick demo:

- Replace this text with your own.
- Optionally, choose tone and refinement instructions.
- Click the 'Refine' button.
- Watch as Refiner XXX.
- Copy XXX

It is an open-source project. The code is available on https://github.com/imankulov/refiner.

Give it a try now.`;

const DEMO_INSTRUCTION_NAMES: InstructionName[] = [
  "short",
  "simple",
  "markdown",
  "fillBlanks",
];

export const textAtom = atomWithStorage("text", DEMO_TEXT);
export const instructionNamesAtom = atomWithStorage<InstructionName[]>(
  "instructionNames",
  DEMO_INSTRUCTION_NAMES
);
export const showDiffAtom = atomWithStorage("showDiff", true);
