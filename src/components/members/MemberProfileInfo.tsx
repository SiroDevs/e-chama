import * as React from "react";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { MemberProfileProps } from "@/types/profiles";
import MemberProfile from "./MemberProfile";

export default function MemberProfileInfo({
  profile,
  member,
  user,
}: MemberProfileProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: "auto", px: 3, pb: 3, pt: 8 }} role="presentation">
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <React.Fragment>
        <MemberProfile
          {...{
            loading: false,
            profile: profile,
            member: member,
            user: user,
          }}
        />
      </React.Fragment>
    </Box>
  );

  return (
    <div>
      <Button
        variant="text"
        endIcon={<ExpandMoreRoundedIcon />}
        onClick={toggleDrawer(true)}
      >
        More
      </Button>
      <Drawer
        open={open}
        anchor="top"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            top: "var(--template-frame-height, 0px)",
            backgroundImage: "none",
            backgroundColor: "background.paper",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
