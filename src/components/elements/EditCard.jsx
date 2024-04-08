import {
  Box,
  Card,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  DeleteForever,
} from "@mui/icons-material";
import PropTypes from "prop-types";

export default function EditCard({
  index = 0,
  dataActive = true,
  itemActive = true,
  itemTitle = "",
  children = null,
  onActive = () => {},
  onDelete = () => {},
  onMove = () => {},
}) {
  return (
    <Card
      component={Card}
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
        mr={-1} mt={-1} gap={2}
      >
        <Box display={"flex"} alignItems={"center"} gap={1} overflow={'hidden'}>
          <Typography noWrap fontWeight={"bold"}>
            {index + 1}: {itemTitle}
          </Typography>
        </Box>
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

      {children}
      
    </Card>
  );
}

EditCard.propTypes = {
  index: PropTypes.number,
  dataActive: PropTypes.bool,
  itemActive: PropTypes.bool,
  itemTitle: PropTypes.string,
  children: PropTypes.node,
  onActive: PropTypes.func,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
};
