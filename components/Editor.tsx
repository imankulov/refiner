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
  refinedAtom,
  resultAtom,
  textAtom,
} from "@/app/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { compareStrings } from "@/app/utils";
import { debounce, get } from "lodash";
import { Header } from "./Header";
import { Box, Stack } from "@mui/material";
import { InstructionsToolbar } from "./InstructionsToolbar";
import { getMetaKeyDisplay, isMetaPressed } from "@/lib/hotkeys";

const AUTO_REFINE = (process.env.NEXT_PUBLIC_AUTO_REFINE ?? "false") === "true";
const AUTO_REFINE_DELAY_MS = parseInt(
  process.env.NEXT_PUBLIC_AUTO_REFINE_DELAY_MS ?? "2000"
);

export function Editor() {
  const [text, setText] = useAtom(textAtom);
  const [instructionNames] = useAtom(instructionNamesAtom);
  const [loading, setLoading] = useState(false);
  const [, setResult] = useAtom(resultAtom);
  const [, setRefined] = useAtom(refinedAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refine();
  };

  async function refine() {
    if (text.trim().length === 0) {
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
  }

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
  }

  function getHelperText() {
    return `Press ${getMetaKeyDisplay()}+Enter to refine`;
  }

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
          helperText={getHelperText()}
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
