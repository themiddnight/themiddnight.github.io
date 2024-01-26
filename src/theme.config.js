import { createTheme } from "@mui/material";

export default createTheme({
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 30,
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
    MuiLink: {
      styleOverrides: {
        root: {
          paddingBlock: 4,
          textDecoration: "none",
        },
      },
      defaultProps: {
        variant: "body1",
      },
    },
  },
});
