import { showDiffAtom } from "@/app/atoms";
import { Box, Tooltip } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useAtom } from "jotai";

export const ChunkUpdate = ({
  insertContent,
  deleteContent,
}: {
  insertContent: string;
  deleteContent: string;
}) => {
  const [showDiff] = useAtom(showDiffAtom);
  let sx = {
    whiteSpace: "pre-wrap",
    backgroundColor: showDiff ? yellow[500] : "inherit",
  };

  return (
    <Tooltip title={<span>{deleteContent}</span>}>
      <Box component="span" sx={sx}>
        {insertContent}
      </Box>
    </Tooltip>
  );
};
