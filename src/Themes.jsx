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

  const memoTheme = useMemo(() => {
    const darkBg = "#1d1d1d";
    const lightBg = "#dddddd";

    // Generate random number between min and max
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    // Generate random mesh style for body background
    function generateMeshStyle() {
      let meshStyleTx = ``;
      for (let i = 0; i < rand(4, 6); i++) {
        let randMeshStyle_txt = `,
          radial-gradient(
              at ${rand(0, 100)}% ${rand(0, 100)}%, 
              hsl(
                ${rand(0, 360)}, 
                ${rand(40, 80)}%, 
                ${rand(
                  prefersDarkMode ? 20 : 70, 
                  prefersDarkMode ? 40 : 90
                )}%
              ) 0%, 
              transparent ${rand(50, 90)}%)`;
        meshStyleTx += randMeshStyle_txt;
      }
      return meshStyleTx;
    }

    return createTheme({
      palette: {
        mode: prefersDarkMode ? "dark" : "light",
        background: {
          default: prefersDarkMode ? darkBg : lightBg,
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1024,
          xl: 1440,
        },
      },
      shape: {
        borderRadius: 20,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundSize: "100% 100dvh",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundImage: `
                linear-gradient(
                  to bottom, transparent 20%, 
                  ${prefersDarkMode ? darkBg : lightBg} 95%
                ) 
                ${generateMeshStyle()}`,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              padding: 10,
              paddingBottom: 3,
              boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.2), inset 0 0 50px 0 rgba(0, 0, 0, 0.05)",
              backgroundColor: prefersDarkMode ? "#000000dd" : "#f4f4f4ee",
              // boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.2)",
              // borderTop: "1px solid #ffffff11",
              // borderInline: "1px solid #00000022",
              // borderBottom: "1px solid #00000044",
              // backgroundImage: prefersDarkMode
              //   ? "linear-gradient(to bottom, #101010, #181818)"
              //   : "linear-gradient(to bottom, #f4f4f4, #ffffff)",
            },
          },
        },
        MuiListItem: {
          styleOverrides: {
            root: {
              paddingBlock: 1,
            },
          },
        },
        MuiListItemIcon: {
          styleOverrides: {
            root: {
              minWidth: 35,
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltipArrow: {
              padding: 8,
              borderRadius: 5,
              filter: "drop-shadow(0 3px 5px #00000055)",
              backdropFilter: "blur(10px)",
              backgroundColor: '#666666bb'
            },
          },
        },
      },
    });
  }, [prefersDarkMode]);

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
