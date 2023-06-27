import { ToneName } from "@/lib/polisher/tones";
import { atomWithStorage } from "jotai/utils";

export const textAtom = atomWithStorage("text", "");
export const toneNamesAtom = atomWithStorage<ToneName[]>("tones", []);
export const showDiffAtom = atomWithStorage("showDiff", true);
