import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#53d98f",
    },
    secondary: {
      main: "#ab47bc",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
