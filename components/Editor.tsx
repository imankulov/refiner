"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { InstructionSelector } from "./InstructionSelector";
import {
  instructionNamesAtom,
  loadingAtom,
  refinedAtom,
  textAtom,
} from "@/app/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Header } from "./Header";
import { Box, Stack } from "@mui/material";
import { InstructionsToolbar } from "./InstructionsToolbar";
import {
  getMetaKeyDisplay,
  getShiftKeyDisplay,
  isMetaPressed,
} from "@/lib/hotkeys";
import { useRefine } from "@/app/hooks/useRefine";
import { isHotkeyPressed, useHotkeys } from "react-hotkeys-hook";
import { useCopyRefinedContent } from "@/app/hooks/useCopyRefinedContent";

const AUTO_REFINE = (process.env.NEXT_PUBLIC_AUTO_REFINE ?? "false") === "true";
const AUTO_REFINE_DELAY_MS = parseInt(
  process.env.NEXT_PUBLIC_AUTO_REFINE_DELAY_MS ?? "2000"
);

export function Editor() {
  const [text, setText] = useAtom(textAtom);
  const [instructionNames] = useAtom(instructionNamesAtom);
  const [loading] = useAtom(loadingAtom);
  const [helperText, setHelperText] = useState("");
  const [refined] = useAtom(refinedAtom);
  const refine = useRefine();
  const copyRefinedContent = useCopyRefinedContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refine();
  };

  useEffect(() => {
    const refinedHelperText =
      refined.trim().length > 0
        ? `, ${getMetaKeyDisplay()}+${getShiftKeyDisplay()}+C to copy refined text to clipboard`
        : "";
    setHelperText(
      `Press ${getMetaKeyDisplay()}+Enter to refine${refinedHelperText}`
    );
  }, [refined]);

  const refineDebounced = debounce(refine, AUTO_REFINE_DELAY_MS);
  useEffect(() => {
    if (!AUTO_REFINE) {
      return;
    }
    refineDebounced();
    return () => refineDebounced.cancel();
  }, [text, instructionNames]);

  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setText(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (isMetaPressed(event) && event.key === "Enter") {
      event.preventDefault();
      refine();
    }
    if (isMetaPressed(event) && event.shiftKey && event.key === "c") {
      event.preventDefault();
      copyRefinedContent();
    }
  }

  useHotkeys("mod+shift+c", (event) => {
    event.preventDefault();
    copyRefinedContent();
  });

  return (
    <Stack spacing={2} direction="column" flexGrow={1}>
      <Header>
        <InstructionSelector />
      </Header>
      <Box>
        <InstructionsToolbar />
        <TextField
          fullWidth
          variant="outlined"
          multiline
          value={text}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          placeholder="Text"
          autoFocus
          sx={{ flexGrow: 1 }}
          minRows={8}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Clear text">
                  <IconButton
                    edge="end"
                    onClick={() => setText("")}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          helperText={helperText}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleSubmit}
        startIcon={<AutoAwesomeIcon />}
      >
        {loading ? "Refining in progress..." : "Refine"}
      </Button>
    </Stack>
  );
}
