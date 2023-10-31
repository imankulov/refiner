import { useShowSnackbar } from "@/components/RefinerSnackbar";
import { useClipboard } from "use-clipboard-copy";
import { refinedAtom } from "../atoms";
import { useAtom } from "jotai";

export function useCopyRefinedContent() {
  const clipboard = useClipboard();
  const showSnackbar = useShowSnackbar();
  const [refined] = useAtom(refinedAtom);

  return function copyRefinedContent() {
    clipboard.copy(refined);
    showSnackbar("Refined content copied to clipboard");
  };
}
