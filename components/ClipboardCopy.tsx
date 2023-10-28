import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useClipboard } from "use-clipboard-copy";
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
      startIcon={<ContentCopyIcon />}
    >
      Copy to Clipboard
    </Button>
  );
}
