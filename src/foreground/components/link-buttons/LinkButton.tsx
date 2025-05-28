import { IconButton, type SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

interface LinkButtonProps {
  link: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

export function LinkButton({ link, Icon }: LinkButtonProps) {
  return (
    <IconButton
      onClick={() => {
        window.open(link);
      }}
    >
      <Icon />
    </IconButton>
  );
}
