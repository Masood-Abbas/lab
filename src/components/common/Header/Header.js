import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Link from "next/link";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { ConfirmationDialog } from "./LogoutConfirmation";
import { useRouter } from "next/router";
import { useState } from "react";
import { deleteFromLocalStorage } from "@/utils/utils";
import { setAuthenticated } from "@/store/auth/authSlice";

const Header = ({ handleDrawerToggle }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    dispatch(setAuthenticated(false));
    router.push("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            href="/home"
            passHref
            style={{
              textDecoration: "none",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "rgb(104,204,198)",
            }}
          >
            DigiLab
          </Link>
          <Typography sx={{ fontSize: "10px", marginTop: "-15px", ml: 0.5 }}>
            {"DigiLab"}
          </Typography>
        </Toolbar>
        <Box sx={{ display: "flex", ml: "auto", width: "auto" }}>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Button>
            <FaCircleUser size={24} onClick={handleOpen} />
          </Button>
        </Box>
      </Box>
      {open && (
        <ConfirmationDialog
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}
    </AppBar>
  );
};

export default Header;
