"use client";

import {
  Box,
  TextField,
  Button,
  Stack,
  Container,
  ToggleButton,
} from "@mui/material";

import { useState } from "react";
import { useAtom } from "jotai";
import { compareStrings } from "./utils";
import { showDiffAtom, textAtom, instructionNamesAtom } from "./atoms";
import { InstructionSelector } from "@/components/InstructionSelector";

const Home = () => {
  const [text, setText] = useAtom(textAtom);
  const [instructionNames] = useAtom(instructionNamesAtom);
  const [showDiff, setShowDiff] = useAtom(showDiffAtom);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JSX.Element[]>([]);

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
    const refined = (await result.json())["refined"];
    setResult(compareStrings(text, refined));
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
          <Box>
            {result.length > 0 && (
              <ToggleButton
                size="small"
                value="check"
                selected={showDiff}
                onChange={() => setShowDiff(!showDiff)}
              >
                {showDiff ? "Hide" : "Show"} diff
              </ToggleButton>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
