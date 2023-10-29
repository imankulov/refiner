import { InstructionName, getInstructions } from "@/lib/refiner/instructions";
import { Box, Stack, Tooltip, Typography } from "@mui/material";

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
