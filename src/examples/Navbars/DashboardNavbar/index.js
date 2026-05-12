import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase"; // ✅ adjust path if needed

// prop-types
import PropTypes from "prop-types";

// @mui components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Breadcrumbs
import Breadcrumbs from "examples/Breadcrumbs";

// styles
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// context
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav } from "context";

function DashboardNavbar({ absolute, light, isMini }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;

  const route = location.pathname.split("/").slice(1);

  // 🔐 PROFILE MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  // 🔐 FIXED LOGOUT (FIREBASE)
  const handleLogout = async () => {
    try {
      handleProfileClose(); // close dropdown

      await signOut(auth); // ✅ real logout

      // optional cleanup
      localStorage.removeItem("auth");
      localStorage.removeItem("userProfile");

      navigate("/sign-in"); // redirect
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    setNavbarType(fixedNavbar ? "sticky" : "static");

    const handleTransparentNavbar = () => {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    };

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  // 🎨 ICON STYLE
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        {/* LEFT SIDE */}
        <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>

        {/* RIGHT SIDE */}
        {!isMini && (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* 🔍 SEARCH */}
            <MDBox pr={1} width="220px">
              <MDInput
                placeholder="Search..."
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& input": {
                    color: darkMode ? "#fff" : "#000",
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: darkMode ? "#0F1B2A" : "#fff",
                    borderRadius: "8px",
                  },
                }}
              />
            </MDBox>

            {/* 👤 PROFILE */}
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                sx={navbarIconButton}
                size="small"
                disableRipple
                onClick={handleProfileOpen}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>

              {/* DROPDOWN MENU */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleProfileClose}
                PaperProps={{
                  sx: {
                    backgroundColor: "#0F1B2A",
                    color: "#ffffff",
                    border: "1px solid #243447",
                    borderRadius: "10px",
                    mt: 1,
                  },
                }}
              >
                <MenuItem onClick={handleProfileClose}>
                  <MDTypography variant="button" color="white">
                    My Profile
                  </MDTypography>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <MDTypography variant="button" color="error">
                    Logout
                  </MDTypography>
                </MenuItem>
              </Menu>

              {/* 📱 SIDENAV TOGGLE */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// DEFAULTS
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// TYPES
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
