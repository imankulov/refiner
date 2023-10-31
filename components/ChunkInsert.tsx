import { showDiffAtom } from "@/app/atoms";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import { useAtom } from "jotai";

export const ChunkInsert = ({ content }: { content: string }) => {
  const [showDiff] = useAtom(showDiffAtom);
  let sx = {
    whiteSpace: "pre-wrap",
    backgroundColor: showDiff ? green[100] : "inherit",
    borderBottom: showDiff ? `2px solid ${green[400]}` : "none",
  };
  return (
    <Box component="span" sx={sx}>
      {content}
    </Box>
  );
};
