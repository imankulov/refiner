import { Box } from "@mui/material";
import { red } from "@mui/material/colors";

export const ChunkDelete = ({ content }: { content: string }) => {
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: red[500],
        whiteSpace: "pre-wrap",
        "&::before": { content: `"${content}"` },
      }}
    ></Box>
  );
};
