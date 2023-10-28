import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { instructionNamesAtom } from "@/app/atoms";
import {
  Instruction,
  InstructionName,
  instructions,
} from "@/lib/refiner/instructions";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  usePopupState,
  bindToggle,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { useResizeDetector } from "react-resize-detector";

export const InstructionSelector = () => {
  const [instructionNames, setInstructionNames] = useAtom(instructionNamesAtom);

  const groupRef = useRef<HTMLDivElement>(null);
  const { width } = useResizeDetector({
    targetRef: groupRef,
  });

  const [visibleButtons, setVisibleButtons] = useState(instructions);
  const [hiddenButtons, setHiddenButtons] = useState<Instruction[]>([]);
  const popupState = usePopupState({
    variant: "popover",
    popupId: "showMoreMenu",
  });

  useEffect(() => {
    if (groupRef.current) {
      const groupWidth = width ?? groupRef.current.offsetWidth;
      let totalWidth = 0;
      let tempVisible: Instruction[] = [];
      let tempHidden: Instruction[] = [];

      instructions.forEach((instruction, index) => {
        // Approximate button width, adjust as needed
        const buttonWidth = instruction.title.length * 8 + 40;
        if (totalWidth + buttonWidth > groupWidth) {
          tempHidden.push(instruction);
        } else {
          tempVisible.push(instruction);
        }
        totalWidth += buttonWidth;
      });

      setVisibleButtons(tempVisible);
      setHiddenButtons(tempHidden);
    }
  }, [width]);

  const handleInstructionChange = (
    event: React.MouseEvent<HTMLElement>,
    newInstructions: InstructionName[]
  ) => {
    setInstructionNames(
      newInstructions.filter((name) => (name as string) !== "")
    );
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

  const isInstructionSelected = (instructionName: InstructionName) => {
    return instructionNames.includes(instructionName);
  };

  return (
    <Box ref={groupRef}>
      <ToggleButtonGroup
        value={instructionNames}
        onChange={handleInstructionChange}
        size="small"
      >
        {visibleButtons.map((instruction) => (
          <ToggleButton value={instruction.name} key={instruction.name}>
            <Tooltip title={instruction.prompt}>
              <span>
                {instruction.emoji} {instruction.title}
              </span>
            </Tooltip>
          </ToggleButton>
        ))}

        {hiddenButtons.length > 0 && (
          <ToggleButton value="" {...bindToggle(popupState)}>
            Show more
            <ExpandMoreIcon />
          </ToggleButton>
        )}

        <Menu {...bindMenu(popupState)}>
          {hiddenButtons.map((instruction) => (
            <MenuItem
              onClick={() => {
                toggleInstructionName(instruction.name);
              }}
              key={instruction.name}
              style={{
                backgroundColor: isInstructionSelected(instruction.name)
                  ? "#e0e0e0"
                  : "transparent",
              }}
            >
              <Checkbox
                edge="start"
                checked={isInstructionSelected(instruction.name)}
                tabIndex={-1}
                disableRipple
                onClickCapture={(e) => {
                  e.stopPropagation();
                  toggleInstructionName(instruction.name);
                }}
              />
              {instruction.emoji} {instruction.title}
            </MenuItem>
          ))}
        </Menu>
      </ToggleButtonGroup>
    </Box>
  );
};
