import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export default function CardHeader({ children, sx }) {
  return (
    <Typography variant="h5" fontWeight={"bold"} gutterBottom sx={sx}>
      {children}
    </Typography>
  );
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};
