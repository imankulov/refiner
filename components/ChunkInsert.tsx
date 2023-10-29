import { showDiffAtom } from "@/app/atoms";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import { useAtom } from "jotai";

export const ChunkInsert = ({ content }: { key: number; content: string }) => {
  const [showDiff] = useAtom(showDiffAtom);
  let sx = {
    whiteSpace: "pre-wrap",
    backgroundColor: showDiff ? green[500] : "inherit",
  };
  return (
    <Box component="span" sx={sx}>
      {content}
    </Box>
  );
};
