import { InstructionName } from "@/lib/refiner/instructions";
import { atomWithStorage } from "jotai/utils";

export const textAtom = atomWithStorage("text", "");
export const instructionNamesAtom = atomWithStorage<InstructionName[]>(
  "instructionNames",
  []
);
export const showDiffAtom = atomWithStorage("showDiff", true);
