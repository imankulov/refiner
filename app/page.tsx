"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import { useAtom } from "jotai";
import { compareStrings } from "./utils";
import { showDiffAtom, textAtom, instructionNamesAtom } from "./atoms";
import { InstructionSelector } from "@/components/InstructionSelector";
import { ClipboardCopy } from "@/components/ClipboardCopy";
import { RefinerSnackbar } from "@/components/RefinerSnackbar";

const Home = () => {
  const [text, setText] = useAtom(textAtom);
  const [instructionNames] = useAtom(instructionNamesAtom);
  const [showDiff, setShowDiff] = useAtom(showDiffAtom);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JSX.Element[]>([]);
  const [refined, setRefined] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      pt={4}
    >
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Clear text">
                    <IconButton
                      edge="end"
                      onClick={() => setText("")}
                      disabled={loading}
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <InstructionSelector />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Refining in progress..." : "Refine"}
          </Button>
          <Box my={4} textAlign="left" sx={{ whiteSpace: "pre-wrap" }}>
            {result}
          </Box>
          <Stack spacing={2} direction="row">
            {result.length > 0 && (
              <>
                <ClipboardCopy content={refined} />
                <ToggleButton
                  size="small"
                  value="check"
                  selected={showDiff}
                  onChange={() => setShowDiff(!showDiff)}
                >
                  <CompareOutlinedIcon />
                  {showDiff ? "Hide" : "Show"} diff
                </ToggleButton>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
      <RefinerSnackbar />
    </Box>
  );
};

export default Home;
