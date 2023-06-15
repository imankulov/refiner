import { Box } from "@mui/material";

export const ChunkEqual = ({ content }: { content: string }) => {
  return (
    <Box component="span" sx={{ whiteSpace: "pre-wrap" }}>
      {content}
    </Box>
  );
};
