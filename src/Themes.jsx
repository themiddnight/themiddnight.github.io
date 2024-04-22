import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { PropTypes } from "prop-types";
import "./App.css";

export default function Themes({ children, bg = {} }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const memoTheme = useMemo(() => {
    const originalDarkBg = "#1d1d1d";
    const originalLightBg = "#eeeeee";
    let bgImage;
    // prepare for custon bg color in the future
    let darkBg = originalDarkBg;
    let lightBg = originalLightBg;

    if (bg.mode === 1) {
      bgImage = `
      linear-gradient(
        to bottom, transparent 20%, 
        ${prefersDarkMode ? darkBg : lightBg} 95%
      ) 
      ${generateMeshStyle()}`;
    } else if (bg.mode === 2) {
      bgImage = `url(${bg.image_url})`;
    } else {
      bgImage = prefersDarkMode ? darkBg : lightBg;
    }


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
      typography: {
        fontFamily: "carlito",
        htmlFontSize: 15,
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1024,
          xl: 1536,
        },
      },
      components: {
        MuiLink: {
          styleOverrides: {
            root: {
              lineHeight: 1.2,
            },
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundImage: bgImage,
              backgroundPosition: "center",
            },
          },
        },
        MuiTypography: {
          styleOverrides: {
            root: {
              lineHeight: 1.3,
              wordBreak: "break-word",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              padding: 10,
              paddingBottom: 3,
              borderRadius: 20,
              boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.2), inset 0 0 50px 0 rgba(0, 0, 0, 0.05)",
              backgroundColor: prefersDarkMode ? "#000000dd" : "#ffffffdd",
              backgroundImage: "none",
              backdropFilter: "blur(10px)",
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
        MuiListItemButton: {
          styleOverrides: {
            root: {
              borderRadius: 10,
              marginBlock: 3,
              paddingBlock: 2,
              paddingInline: 10,
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
        MuiTextField: {
          styleOverrides: {
            root: {
              "& .MuiOutlinedInput-root": {
                borderRadius: 10,
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 10,
            },
          },
        },
        MuiSlider: {
          styleOverrides: {
            root: {
              "& .MuiSlider-thumb.Mui-disabled": {
                display: "none",
              },
            },
          },
        },
        MuiFormGroup: {
          styleOverrides: {
            root: {
              display: 'block',
            },
          },
        },
        MuiFormControlLabel: {
          styleOverrides: {
            root: {
              alignSelf: 'flex-start',
            },
          },
        },
      },
    });
  }, [bg, prefersDarkMode]);

  return (
    <ThemeProvider theme={memoTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

Themes.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.object,
};
