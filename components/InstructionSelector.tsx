import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import { instructionNamesAtom } from "@/app/atoms";
import {
  InstructionGroup,
  InstructionName,
  instructionGroups,
} from "@/lib/refiner/instructions";
import { useAtom } from "jotai";
import {
  usePopupState,
  bindToggle,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

export const InstructionSelector = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "left" }}>
      {instructionGroups.map((instructionGroup) => (
        <InstructionMenu
          key={instructionGroup.groupName}
          instructionGroup={instructionGroup}
        />
      ))}
    </Box>
  );
};

function InstructionMenu({
  instructionGroup,
}: {
  instructionGroup: InstructionGroup;
}) {
  const [instructionNames, setInstructionNames] = useAtom(instructionNamesAtom);

  const popupState = usePopupState({
    variant: "popover",
    popupId: instructionGroup.groupName,
  });

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
    <>
      <Button {...bindToggle(popupState)}>
        {instructionGroup.emoji} {instructionGroup.groupName}
      </Button>
      <Menu {...bindMenu(popupState)}>
        {instructionGroup.instructions.map((instruction) => (
          <HtmlTooltip
            key={instruction.name}
            title={instruction.prompt}
            placement="right"
            arrow
          >
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
          </HtmlTooltip>
        ))}
      </Menu>
    </>
  );
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}, & .${tooltipClasses.arrow}`]: {
    maxWidth: 300,
  },
});
