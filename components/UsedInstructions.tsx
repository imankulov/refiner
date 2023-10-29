import { InstructionName, getInstructions } from "@/lib/refiner/instructions";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export function UsedInstructions({
  instructionNames,
}: {
  instructionNames: InstructionName[];
}) {
  const instructions = getInstructions(instructionNames);
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="flex-end"
      height="14px"
      pl={2}
    >
      {instructions.map((instruction) => (
        <Tooltip
          title={instruction.prompt}
          key={instruction.name}
          placement="top"
          arrow
        >
          <Typography variant="caption">{instruction.emoji}</Typography>
        </Tooltip>
      ))}
    </Stack>
  );
}

export function UsedInstructionsPlaceholder() {
  return <Box sx={{ height: "14px" }}></Box>;
}
