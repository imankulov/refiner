import { instructionNamesAtom } from "@/app/atoms";
import { InstructionName, instructions } from "@/lib/refiner/instructions";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useAtom } from "jotai";
import { green } from "@mui/material/colors";

export function InstructionsToolbar() {
  const [instructionNames, setInstructionNames] = useAtom(instructionNamesAtom);

  const isInstructionSelected = (instructionName: InstructionName) => {
    return instructionNames.includes(instructionName);
  };

  const toggleInstructionName = (instructionName: InstructionName) => {
    if (isInstructionSelected(instructionName)) {
      setInstructionNames(
        instructionNames.filter((name) => name !== instructionName)
      );
    } else {
      setInstructionNames([...instructionNames, instructionName]);
    }
  };

  return (
    <ToggleButtonGroup
      value={instructionNames}
      onChange={(event, value) => {
        console.log(value);
        setInstructionNames(value);
      }}
      size="small"
      sx={{ mb: 1 }}
    >
      {instructions.map((instruction) => (
        <Tooltip
          title={instruction.prompt}
          key={instruction.name}
          placement="top"
          arrow
        >
          <ToggleButton
            value={instruction.name}
            sx={{
              filter: isInstructionSelected(instruction.name)
                ? "none"
                : "grayscale(100%)",
              borderBottom: !isInstructionSelected(instruction.name)
                ? "1px solid rgba(0, 0, 0, 0.12)"
                : `4px solid ${green[300]}`,
            }}
          >
            {instruction.emoji}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}

export function UsedInstructionsPlaceholder() {
  return <Box sx={{ minHeight: "40px", mb: 1 }}></Box>;
}
