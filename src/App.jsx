import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import "./App.css";
import Home from "./Home";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const memoTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          background: {
            default: prefersDarkMode ? "#121212" : "#eeeeee",
          },
        },
        shape: {
          borderRadius: 20,
        },
        components: {
          MuiListItemIcon: {
            styleOverrides: {
              root: {
                minWidth: 35,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                padding: 10,
                boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.2)",
              },
            },
          },
          MuiListItem: {
            styleOverrides: {
              root: {
                paddingTop: 1,
                paddingBottom: 1,
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={memoTheme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
