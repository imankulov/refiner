"use client";

import { Box, TextField, Button, Grid, Container } from "@mui/material";

import { useState } from "react";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { compareStrings } from "./utils";

const textAtom = atomWithStorage("text", "");

const Home = () => {
  const [text, setText] = useAtom(textAtom);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JSX.Element[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetch("api/v1/polish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const polished = (await result.json())["polished"];
    setResult(compareStrings(text, polished));
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
              >
                {loading ? "Polishing in progress..." : "Polish"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box my={4} textAlign="left" sx={{ whiteSpace: "pre-wrap" }}>
          {result}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
