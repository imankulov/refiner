import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useCopyRefinedContent } from "@/app/hooks/useCopyRefinedContent";
import { useState } from "react";
import { HotkeyHint } from "./HotkeyHint";

export function ClipboardCopy() {
  const copyRefinedContent = useCopyRefinedContent();
  const [hotkeyHelp, setHotkeyHelp] = useState("");

  return (
    <Button
      size="small"
      variant="outlined"
      onClick={copyRefinedContent}
      startIcon={<ContentCopyIcon />}
    >
      Copy to Clipboard
      <HotkeyHint hotkey="mod+shift+c" />
    </Button>
  );
}
