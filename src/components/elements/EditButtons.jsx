import {
  Menu,
  SaveRounded,
  UnfoldMore,
  UnfoldLess,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
} from "@mui/icons-material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Box, Fab, CircularProgress, Collapse, Tooltip } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

export default function EditButtons({
  expanded,
  setExpanded,
  isSaving,
  onSubmit,
}) {
  const btnPosition = { xs: 24, sm: 36, md: 48 };
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box
        sx={{
          position: "fixed",
          bottom: btnPosition,
          right: btnPosition,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Collapse in={open} timeout={200}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="center"
            mb={3}
          >
            <Tooltip title="Scroll to top" placement="left">
              <Fab
                color="action"
                size="small"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <KeyboardArrowUp />
              </Fab>
            </Tooltip>

            <Tooltip title="Scroll to bottom" placement="left">
              <Fab
                color="action"
                size="small"
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
              >
                <KeyboardArrowDown />
              </Fab>
            </Tooltip>

            <Tooltip
              title={expanded ? "Collapse All" : "Expand All"}
              placement="left"
            >
              <span>
              <Fab
                disabled={!setExpanded}
                color="secondary"
                size="small"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <UnfoldLess /> : <UnfoldMore />}
              </Fab>
              </span>
            </Tooltip>

            <Tooltip title="Save" placement="left">
              <Fab
                color="primary"
                size="small"
                disabled={isSaving}
                onClick={onSubmit}
                sx={{ boxShadow: 4 }}
              >
                {isSaving ? (
                  <CircularProgress
                    thickness={6}
                    size={24}
                    sx={{ color: "white" }}
                  />
                ) : (
                  <SaveRounded
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "black" : "white",
                    }}
                  />
                )}
              </Fab>
            </Tooltip>
          </Box>
        </Collapse>
        <Fab
          color="info"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <Close /> : <Menu />}
        </Fab>
      </Box>
    </ClickAwayListener>
  );
}

EditButtons.propTypes = {
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  isSaving: PropTypes.bool,
  onSubmit: PropTypes.func,
};
