import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { MemberProfileProps } from "@/types/profiles";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const products = [
  {
    name: "Professional plan",
    desc: "Monthly subscription",
    price: "$15.00",
  },
  {
    name: "Dedicated support",
    desc: "Included in the Professional plan",
    price: "Free",
  },
  {
    name: "Hardware",
    desc: "Devices needed for development",
    price: "$69.99",
  },
  {
    name: "Landing page template",
    desc: "License",
    price: "$49.99",
  },
];

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
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          Total
        </Typography>
        <Typography variant="h4" gutterBottom>
          aaxxx
        </Typography>
        <List disablePadding>
          {products.map((product) => (
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
              <ListItemText
                sx={{ mr: 2 }}
                primary={product.name}
                secondary={product.desc}
              />
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {product.price}
              </Typography>
            </ListItem>
          ))}
        </List>
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
