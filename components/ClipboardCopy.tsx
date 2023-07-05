import { Button } from "@mui/material";
import { useClipboard } from "use-clipboard-copy";
import { ContentCopy } from "@mui/icons-material";
import { useShowSnackbar } from "./RefinerSnackbar";

export function ClipboardCopy({ content }: { content: string }) {
  const clipboard = useClipboard();
  const showSnackbar = useShowSnackbar();

  const handleClick = () => {
    clipboard.copy(content);
    showSnackbar("Refined content copied to clipboard");
  };

  return (
    <Button
      size="small"
      variant="outlined"
      onClick={handleClick}
      startIcon={<ContentCopy />}
    >
      Copy to Clipboard
    </Button>
  );
}
