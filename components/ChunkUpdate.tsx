import { Box, Tooltip } from "@mui/material";
import { yellow } from "@mui/material/colors";

export const ChunkUpdate = ({
  insertContent,
  deleteContent,
}: {
  insertContent: string;
  deleteContent: string;
}) => {
  return (
    <Tooltip title={<span>{deleteContent}</span>}>
      <Box
        component="span"
        sx={{ backgroundColor: yellow[500], whiteSpace: "pre-wrap" }}
      >
        {insertContent}
      </Box>
    </Tooltip>
  );
};
