import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from '@mui/material'
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import { useAuth, useDarkMode } from "../../contexts/UserContext/UserContext";
import { blue } from '@mui/material/colors';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';


const Header = () => {
  const navigate = useNavigate();

  const { currentUser, handleLogout } = useAuth();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Box sx={{ flexGrow: 1 }} className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      {/* <AppBar position="static"> */}
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: `${blue[600]}`, fontWeight: 700, }}>
          CyberSoft Movie Pro
        </Typography>
        <Typography
          onChange={() => {
            toggleDarkMode()
          }}
        >
          <DarkModeToggle />
        </Typography>
        {currentUser ? (
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography variant="h6">Xin chào {currentUser.hoTen}</Typography>
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                handleLogout();
                // đăng xuất rồi thì đá qua trang HOME
                navigate(PATH.HOME);
              }}>
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2} direction={"row"}>
            <Button variant="outlined" onClick={() => navigate(PATH.SIGN_UP)}>
              Signup
            </Button>
            <Button variant="contained" onClick={() => navigate(PATH.SIGN_IN)}>
              Signin
            </Button>
          </Stack>
        )}
      </Toolbar >
      {/* </AppBar> */}
    </Box >
  );
};

export default Header