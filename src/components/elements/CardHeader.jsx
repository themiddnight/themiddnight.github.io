import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export default function CardHeader({ children, sx }) {
  return (
    <Typography variant="h5" fontWeight={"bold"} display={'flex'} alignItems={'center'} gap={1.5} mb={2} sx={sx}>
      {children}
    </Typography>
  );
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};
