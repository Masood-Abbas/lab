import React, { useEffect, useMemo, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { themePalette } from "@/Lib/theme/palette";
import { getUserByEmail } from "@/api/userApi";
import { useMutation, useQuery } from "react-query";
import { getFromLocalStorage } from "@/utils/utils";
import { setUser } from "@/store/auth/authSlice";

const drawerWidth = 240;

const AdminLayout = ({ children, roles = null }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);

  

  useEffect(() => {
    if (authenticated) {
      return;
    } else {
      router.push("/");
    }
  }, [router, authenticated]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={themePalette}>
      {/* {isLoading && <Loader />} */}
      {authenticated && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header handleDrawerToggle={handleDrawerToggle} />
          <Sidebar
            handleDrawerToggle={handleDrawerToggle}
            open={open}
            drawerWidth={drawerWidth}
          />
          <Box
            className="main-layout"
            component="main"
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            {children}
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default AdminLayout;
