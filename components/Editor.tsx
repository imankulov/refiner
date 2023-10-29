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
import { getInstructions } from "@/lib/refiner/instructions";
import { InstructionsToolbar } from "./InstructionsToolbar";

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

  const refineDebounced = debounce(refine, 1500);

  useEffect(() => {
    refineDebounced();
    return () => refineDebounced.cancel();
  }, [text, instructionNames]);

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
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          sx={{ flexGrow: 1 }}
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
