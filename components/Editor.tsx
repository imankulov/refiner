"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { InstructionSelector } from "./InstructionSelector";
import { instructionNamesAtom, loadingAtom, textAtom } from "@/app/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Header } from "./Header";
import { Box, Stack } from "@mui/material";
import { InstructionsToolbar } from "./InstructionsToolbar";
import { getEnterKeyDisplay, getModKeyDisplay } from "@/lib/hotkeys";
import { useRefine } from "@/app/hooks/useRefine";
import { HotkeyHint } from "./HotkeyHint";

const AUTO_REFINE = (process.env.NEXT_PUBLIC_AUTO_REFINE ?? "false") === "true";
const AUTO_REFINE_DELAY_MS = parseInt(
  process.env.NEXT_PUBLIC_AUTO_REFINE_DELAY_MS ?? "2000"
);

export function Editor() {
  const [text, setText] = useAtom(textAtom);
  const [instructionNames] = useAtom(instructionNamesAtom);
  const [loading] = useAtom(loadingAtom);
  const [helperText, setHelperText] = useState("");
  const refine = useRefine();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refine();
  };

  useEffect(() => {
    setHelperText(
      `Press ${getModKeyDisplay()}+${getEnterKeyDisplay()} to refine`
    );
  }, []);

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

  return (
    <Stack spacing={2} direction="column" flexGrow={1}>
      <Box>
        <TextField
          fullWidth
          variant="outlined"
          multiline
          value={text}
          onChange={handleOnChange}
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
        {loading ? (
          "Refining in progress..."
        ) : (
          <>
            Refine <HotkeyHint hotkey="mod+enter" />
          </>
        )}
      </Button>
    </Stack>
  );
}
