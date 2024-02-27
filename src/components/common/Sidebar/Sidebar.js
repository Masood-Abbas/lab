import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import { SiHomebridge } from "react-icons/si";
import BuildIcon from "@mui/icons-material/Build";
import Person2Icon from "@mui/icons-material/Person2";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import BusinessIcon from "@mui/icons-material/Business";
import StarsIcon from "@mui/icons-material/Stars";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const Sidebar = (props) => {
  const router = useRouter();

  const { window, handleDrawerToggle, open, drawerWidth } = props;

  const styles = {
    fontSize: "1.375rem",
  };

  const drawer = (
    <div>
      <Toolbar />

      <List>
        <Link href="/home" passHref>
          <ListItem disablePadding className="truncate-text">
            <ListItemButton
              className={router?.pathname === "/Home" ? "active" : ""}
              sx={styles}
            >
              <ListItemIcon>
                <BusinessIcon
                  className={
                    router?.pathname === "/Home"
                      ? "active-icon"
                      : "inactive-icon"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={<span style={{ textDecoration: "none" }}>Home</span>}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="/users" passHref>
          <ListItem disablePadding className="truncate-text">
            <ListItemButton
              className={router?.pathname === "/users" ? "active" : ""}
              sx={styles}
            >
              <ListItemIcon>
                <Person2Icon
                  className={
                    router?.pathname === "/users"
                      ? "active-icon"
                      : "inactive-icon"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <List>
        <Link href="/title" passHref>
          <ListItem disablePadding className="truncate-text">
            <ListItemButton
              className={router?.pathname === "/title" ? "active" : ""}
              sx={styles}
            >
              <ListItemIcon>
                <StarsIcon
                  className={
                    router?.pathname === "/title"
                      ? "active-icon"
                      : "inactive-icon"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Title" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <List>
        <Link href="/role" passHref>
          <ListItem disablePadding className="truncate-text">
            <ListItemButton
              className={router?.pathname === "/role" ? "active" : ""}
              sx={styles}
            >
              <ListItemIcon>
                <SiHomebridge
                  className={
                    router?.pathname === "/role"
                      ? "active-icon"
                      : "inactive-icon"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Role" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <List>
        <Link href="/instrument" passHref>
          <ListItem disablePadding className="truncate-text">
            <ListItemButton
              className={router?.pathname === "/instrument" ? "active" : ""}
              sx={styles}
            >
              <ListItemIcon>
                <BuildIcon
                  className={
                    router?.pathname === "/instrument"
                      ? "active-icon"
                      : "inactive-icon"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Instrument" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <List>
        <Link href="/request" passHref>
          <ListItem disablePadding className="truncate-text">
            <ListItemButton
              className={router?.pathname === "/request" ? "active" : ""}
              sx={styles}
            >
              <ListItemIcon>
                <CreateNewFolderIcon
                  className={
                    router?.pathname === "/request"
                      ? "active-icon"
                      : "inactive-icon"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Request" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <List>
        <Link href="/approved-requests" passHref>
          <ListItem disablePadding className="truncate-text">
            <ListItemButton
              className={
                router?.pathname === "/approved-requests" ? "active" : ""
              }
              sx={styles}
            >
              <ListItemIcon>
                <AssignmentTurnedInIcon
                  className={
                    router?.pathname === "/approved-requests"
                      ? "active-icon"
                      : "inactive-icon"
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Approved Requests" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
