import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import React from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import MuiDrawer from "@mui/material/Drawer";

import HomeIcon from "@mui/icons-material/Home";

interface MenuProps {
  children: React.ReactNode;
}

export function Menu({ children }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const mdTheme = createTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleCreate = (event: any) => {
    navigate("/create");
  };

  const handleHome = (event: any) => {
    navigate("/Dashboard");
  };
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  const drawerWidth: number = 60;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(10),
        },
      }),
    },
  }));

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
            <Stack
              spacing={2}
              sx={{
                marginTop: 25,
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={handleHome}>
                <HomeIcon />
              </Button>
              <Button onClick={handleCreate}>
                <AddIcon />
              </Button>
            </Stack>
          </Toolbar>
        </Drawer>
        {children}
      </Box>
    </ThemeProvider>
  );
}
