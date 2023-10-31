import { useAtom } from "jotai";
import { showDiffAtom } from "../atoms";

export function useToggleDiff() {
  const [showDiff, setShowDiff] = useAtom(showDiffAtom);
  return () => setShowDiff(!showDiff);
}
