import { instructionNamesAtom } from "@/app/atoms";
import { InstructionName, instructions } from "@/lib/polisher/instructions";
import { useAtom } from "jotai";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";

export const InstructionSelector = () => {
  const [instructionNames, setInstructionNames] = useAtom(instructionNamesAtom);

  const handleInstructionChange = (
    event: React.MouseEvent<HTMLElement>,
    newInstructions: InstructionName[]
  ) => {
    setInstructionNames(newInstructions);
  };

  return (
    <ToggleButtonGroup
      value={instructionNames}
      onChange={handleInstructionChange}
      size="small"
    >
      {instructions.map((instruction) => (
        <ToggleButton value={instruction.name} key={instruction.name}>
          <Tooltip title={instruction.prompt}>
            <span>
              {instruction.emoji} {instruction.title}
            </span>
          </Tooltip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
