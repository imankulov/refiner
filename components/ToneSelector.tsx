import { toneNamesAtom } from "@/app/atoms";
import { ToneName, tones } from "@/lib/polisher/tones";
import { useAtom } from "jotai";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";

export const ToneSelector = () => {
  const [toneNames, setToneNames] = useAtom(toneNamesAtom);

  const handleToneChange = (
    event: React.MouseEvent<HTMLElement>,
    newTones: ToneName[]
  ) => {
    setToneNames(newTones);
  };

  return (
    <ToggleButtonGroup
      value={toneNames}
      onChange={handleToneChange}
      size="small"
    >
      {tones.map((tone) => (
        <ToggleButton value={tone.name} key={tone.name}>
          <Tooltip title={tone.prompt}>
            <span>
              {tone.emoji} {tone.title}
            </span>
          </Tooltip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
