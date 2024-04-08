import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function IntroScreen ({ data, isEnter = false, onEnter = () => {}, position = 'fixed' }) {
  return (
    <Box
      position={position}
      top={0} left={0} right={0} bottom={0}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      className={"basic-bg"}
    >
      <Box textAlign={'center'} className={!isEnter ? "intro-in__text" : "intro-out__text"}>
        <Typography variant="h2">{data.intro.title}</Typography>
        <Typography variant="h4" fontWeight={'light'} mb={5} gutterBottom>{data.intro.subtitle}</Typography>
      </Box>
      <Button 
        variant={isEnter ? "contained" : "outlined"}
        color="primary" 
        size="large" 
        className={!isEnter ? "intro-in__button pulse" : "intro-out__button"}
        onClick={onEnter}
        sx={{ borderRadius: 50 }}
      >
        {data.intro.enter_button}
      </Button>
    </Box>
  );
}

IntroScreen.propTypes = {
  data: PropTypes.object.isRequired,
  isEnter: PropTypes.bool,
  position: PropTypes.string,
  onEnter: PropTypes.func,
};