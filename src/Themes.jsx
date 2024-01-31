import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { PropTypes } from "prop-types";
import "./App.css";

export default function Themes({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const memoTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          background: {
            default: prefersDarkMode ? "#121212" : "#e8e8e8",
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
                borderTop: "1px solid #ffffff11",
                borderInline: "1px solid #00000022",
                borderBottom: "1px solid #00000044",
                backgroundImage: prefersDarkMode
                  ? "linear-gradient(to bottom, #202020, #282828)"
                  : "linear-gradient(to bottom, #f4f4f4, #ffffff)",
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
      {children}
    </ThemeProvider>
  );
}

Themes.propTypes = {
  children: PropTypes.node.isRequired,
};
