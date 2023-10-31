import Box from "@mui/material/Box";

import {
  getEnterKeyDisplay,
  getModKeyDisplay,
  getShiftKeyDisplay,
} from "@/lib/hotkeys";
import { useEffect, useState } from "react";

export function HotkeyHint({ hotkey }: { hotkey: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const mod = getModKeyDisplay();
    const shift = getShiftKeyDisplay();
    const enter = getEnterKeyDisplay();
    setText(
      hotkey.replace("mod", mod).replace("shift", shift).replace("enter", enter)
    );
  }, [hotkey]);

  if (!text) {
    return null;
  }

  return (
    <Box
      component="span"
      display={{
        xs: "none",
        md: "inline",
      }}
      pl={{
        xs: 0,
        md: 1,
      }}
    >
      ({text})
    </Box>
  );
}
