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
    const fetchData = async () => {
      const email = getFromLocalStorage("appEmail");
      try {
        const response = await fetch(`http://localhost:5000/user/${email}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(response,data)
        dispatch(setUser(data))
      } catch (error) {
        error;
      }
    };

    if (
      router?.pathname === "/home" ||
      router?.pathname === "request" ||
      router?.pathname === "instrument" ||
      router?.pathname === "role" ||
      router?.pathname === "title" ||
      router?.pathname === "users"
    ) {
      fetchData();
    }
  }, [router]);

  // useQuery({
  //   mutationFn: () => getUserByEmail(getFromLocalStorage('appEmail')),
  //   onSuccess: (res) => {
  //     (res)
  //   },
  // });

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

  const isAuthenticated = () => {
    return true;
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
