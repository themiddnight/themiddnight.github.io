import {
  Box,
  Card,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
  Tooltip,
  Button,
  Collapse,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  DeleteForever,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function EditCard({
  index = 0,
  dataActive = true,
  itemActive = true,
  itemTitle = "",
  children = null,
  expanded = true,
  onActive = () => {},
  onDelete = () => {},
  onMove = () => {},
}) {
  const [open, setOpen] = useState(expanded);

  useEffect(() => {
    if (!expanded) setOpen(false);
    else setOpen(true);
  }, [expanded]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
        p: { xs: 2, sm: 3 },
        opacity: dataActive ? (itemActive ? 1 : 0.5) : 0.5,
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        m={-1}
        gap={2}
      >
        <Button
          variant={"text"}
          fullWidth
          color="inherit"
          sx={{
            pl: 0,
            textUnderlineOffset: 2,
            textTransform: "none",
            justifyContent: "flex-start",
          }}
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          <Typography noWrap fontWeight={"bold"}>
            {index + 1}: {itemTitle}
          </Typography>
        </Button>
        <Box display={"flex"} alignItems={"center"}>
          <FormGroup>
            <Tooltip title="Public" placement="top">
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={itemActive}
                    onChange={(e) => onActive(e.target.checked)}
                  />
                }
              />
            </Tooltip>
          </FormGroup>
          <Tooltip title="Move Up" placement="top">
            <IconButton size="small" onClick={() => onMove(-1)}>
              <KeyboardArrowUp />
            </IconButton>
          </Tooltip>

          <Tooltip title="Move Down" placement="top">
            <IconButton size="small" onClick={() => onMove(1)}>
              <KeyboardArrowDown />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => onDelete(index)}>
              <DeleteForever color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Collapse in={open} unmountOnExit>
        <Box display="flex" flexDirection="column" rowGap={2} mt={1}>
          {children}
        </Box>
      </Collapse>
    </Card>
  );
}

EditCard.propTypes = {
  index: PropTypes.number,
  dataActive: PropTypes.bool,
  itemActive: PropTypes.bool,
  itemTitle: PropTypes.string,
  expanded: PropTypes.bool,
  children: PropTypes.node,
  onActive: PropTypes.func,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
};
