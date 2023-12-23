import { Box, Button, Input, Switch, Typography } from '@mui/material';
import React from 'react'
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box>
      <Typography
        align="center"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: "center",
          fontSize: 24,
        }}
      >
        Dark Mode
        <Brightness7Icon />
        <Switch
          type="checkbox"
          checked={isDarkMode}
          variant="h5"
          style={{
            fontSize: 30,
          }}
        >
        </Switch>
        <Brightness4Icon />
      </Typography>
    </Box>
  );
}

export default DarkModeToggle