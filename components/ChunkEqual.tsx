import Box from "@mui/material/Box";

export const ChunkEqual = ({ content }: { content: string }) => {
  return (
    <Box component="span" sx={{ whiteSpace: "pre-wrap" }}>
      {content}
    </Box>
  );
};
