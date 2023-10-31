import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useCopyRefinedContent } from "@/app/hooks/useCopyRefinedContent";
import { useEffect, useState } from "react";
import { getMetaKeyDisplay, getShiftKeyDisplay } from "@/lib/hotkeys";

export function ClipboardCopy() {
  const copyRefinedContent = useCopyRefinedContent();
  const [hotkeyHelp, setHotkeyHelp] = useState("");

  useEffect(() => {
    setHotkeyHelp(` (${getMetaKeyDisplay()}+${getShiftKeyDisplay()}+C)`);
  }, []);

  return (
    <Button
      size="small"
      variant="outlined"
      onClick={copyRefinedContent}
      startIcon={<ContentCopyIcon />}
    >
      Copy to Clipboard {hotkeyHelp}
    </Button>
  );
}
