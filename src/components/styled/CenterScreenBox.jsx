import { Box } from "@mui/material"
import PropTypes from 'prop-types';

export default function CenterScreenBox({ children }) {
  return (
    <Box
      position={'fixed'}
      top={0} left={0} right={0} bottom={0}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      className={"basic-bg"}
    >
      {children}
    </Box>
  );
}

CenterScreenBox.propTypes = {
  children: PropTypes.node.isRequired,
};