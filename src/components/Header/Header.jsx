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
import { useAuth } from "../../contexts/UserContext/UserContext";
// import { useContext } from "react"
// import { UserContext } from "../../contexts/UserContext";

const Header = () => {
  const navigate = useNavigate();
  // const {currentUser} = useContext(UserContext);
  // console.log('currentUser: ', currentUser);
  const { currentUser, handleLogout } = useAuth();
  console.log('currentUser: ', currentUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {currentUser ? (
          <Stack direction={"row"} spacing={2}>
            <Typography>{currentUser.hoTen}</Typography>
            <Button size="large" variant="contained" onClick={() => {
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