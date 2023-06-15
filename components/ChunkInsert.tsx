import { Box } from "@mui/material";
import { green } from "@mui/material/colors";

export const ChunkInsert = ({ content }: { key: number; content: string }) => {
  return (
    <Box
      component="span"
      sx={{ backgroundColor: green[500], whiteSpace: "pre-wrap" }}
    >
      {content}
    </Box>
  );
};
