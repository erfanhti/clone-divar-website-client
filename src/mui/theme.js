import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Vazir","Roboto","Arial"`,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontWeightHeavy: 800,
    fontWeightFat: 900,
  },
  direction: "rtl",
  palette: {
    divar: {
      main: "#a62626",
    },
  },
});

export default theme;
