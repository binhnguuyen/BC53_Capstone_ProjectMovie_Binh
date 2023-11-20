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

const Header = () => {
  const navigate = useNavigate();
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
          <Stack spacing={2} direction={"row"}>
            <Button variant="outlined" onClick={() => navigate(PATH.SIGN_UP)}>Sign up</Button>
            <Button variant="contained" onClick={() => navigate(PATH.SIGN_IN)}>Sign in</Button>
          </Stack>
        </Toolbar>
      {/* </AppBar> */}
    </Box>
  );
};

export default Header