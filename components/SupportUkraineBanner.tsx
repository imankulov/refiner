import { useState } from "react";

import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export function SupportUkraineBanner() {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Alert severity="info" icon={false}>
      <IconButton
        color="inherit"
        size="small"
        onClick={toggleDetails}
        sx={{ padding: 0, mr: 1 }}
      >
        {showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      <Link
        href="https://savelife.in.ua/en/donate-en/"
        target="_blank"
        underline="hover"
      >
        Stop Putin! Support Ukraine 🇺🇦
      </Link>
      <Collapse in={showDetails}>
        <br />
        Please support Ukraine.
        <br />
        <br />
        If you follow the news, you can see the atrocities committed by Russian
        soldiers in Ukraine. For me, it is personal. I am from Russia, and I
        have friends in Ukraine. I am terrified for them and their families, and
        I am deeply ashamed of what the Putin regime is doing using my
        country&apos;s name. I am also afraid that Ukraine is just the
        beginning. If we do not stop Putin now, he will continue to expand his
        war machine.
        <br />
        <br />
        Now, the most effective way to stop Putin is to support Ukraine. There
        are many organizations, but I would recommend &quot;Come Back
        Alive&quot;. They are a reputable organization, known for their
        transparency and impactful use of funds in directly combating
        Putin&apos;s forces.
        <br />
        <br />
        <Link
          href="https://savelife.in.ua/en/donate-en/"
          target="_blank"
          underline="hover"
        >
          Donate to Come Back Alive 🇺🇦
        </Link>
        <br />
        <br />
        Regards, <br />
        Roman, the author of Refiner.
      </Collapse>
    </Alert>
  );
}
