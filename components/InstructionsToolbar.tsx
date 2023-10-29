import { instructionNamesAtom } from "@/app/atoms";
import { InstructionName, instructions } from "@/lib/refiner/instructions";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";

export function InstructionsToolbar() {
  const [instructionNames, setInstructionNames] = useAtom(instructionNamesAtom);

  function toggleInstruction(name: InstructionName) {
    const index = instructionNames.indexOf(name);
    if (index === -1) {
      setInstructionNames([...instructionNames, name]);
    } else {
      setInstructionNames([
        ...instructionNames.slice(0, index),
        ...instructionNames.slice(index + 1),
      ]);
    }
  }

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
          <Typography
            variant="body2"
            sx={{
              filter: instructionNames.includes(instruction.name)
                ? "none"
                : "grayscale(1) opacity(0.5)",
              cursor: "pointer",
              "&:hover": {
                filter: "none",
              },
            }}
            onClick={() => {
              toggleInstruction(instruction.name);
            }}
          >
            {instruction.emoji}
          </Typography>
        </Tooltip>
      ))}
    </Stack>
  );
}

export function UsedInstructionsPlaceholder() {
  return <Box sx={{ height: "14px" }}></Box>;
}
