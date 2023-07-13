import { InstructionName } from "@/lib/refiner/instructions";
import { atomWithStorage } from "jotai/utils";
import { DEMO_INSTRUCTION_NAMES, DEMO_TEXT } from "./constants";

export const textAtom = atomWithStorage("text", DEMO_TEXT);
export const instructionNamesAtom = atomWithStorage<InstructionName[]>(
  "instructionNames",
  DEMO_INSTRUCTION_NAMES
);
export const showDiffAtom = atomWithStorage("showDiff", true);
