import { useAtom } from "jotai";
import {
  instructionNamesAtom,
  loadingAtom,
  refinedAtom,
  resultAtom,
  textAtom,
} from "../atoms";
import { compareStrings } from "../utils";

export function useRefine() {
  const [text] = useAtom(textAtom);
  const [instructionNames] = useAtom(instructionNamesAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [, setResult] = useAtom(resultAtom);
  const [, setRefined] = useAtom(refinedAtom);

  return async function refine() {
    if (text.trim().length === 0) {
      setRefined("");
      setResult([]);
      return;
    }
    setResult([]);
    setLoading(true);
    const result = await fetch("api/v1/refine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, instructionNames }),
    });
    const localRefined = (await result.json())["refined"];
    setRefined(localRefined);
    setResult(compareStrings(text, localRefined));
    setLoading(false);
  };
}
