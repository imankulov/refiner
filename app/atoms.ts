import { InstructionName } from "@/lib/refiner/instructions";
import { atomWithStorage } from "jotai/utils";

const DEMO_TEXT = `Welcome to Refiner. Here's a quik demo:

- Replace this text with your own.
- Optionally, choose tone.
- Click the 'Refine' button.
- Watch as Refiner improves your text.

Give it a try now.`;

const DEMO_INSTRUCTION_NAMES: InstructionName[] = ["short", "simple"];

export const textAtom = atomWithStorage("text", DEMO_TEXT);
export const instructionNamesAtom = atomWithStorage<InstructionName[]>(
  "instructionNames",
  DEMO_INSTRUCTION_NAMES
);
export const showDiffAtom = atomWithStorage("showDiff", true);
