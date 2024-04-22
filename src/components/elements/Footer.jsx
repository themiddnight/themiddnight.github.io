import { Box, Divider, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component={'footer'} sx={{ py: 5, opacity: 0.7 }}>
      <Divider sx={{ my: 5 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' }, gap: { xs: 5, md: 10 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant={'body2'}>My Resume Web</Typography>
          <Typography fontSize={'small'}>This is my personal project for learning fullstack web development.</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant={'body2'}>Contact</Typography>
          <Typography fontSize={'small'} variant={'subtitle1'}>Pathompong Thitithan</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 5 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography fontSize={'small'}>Email:</Typography>
              <Link fontSize={'small'} href={'mailto:the.midnight.k.0173@gmail.com'} underline={'hover'}>
                the.midnight.k.0173@gmail.com
              </Link>
              <Typography fontSize={'small'}>Website:</Typography>
              <Link fontSize={'small'} href={'https://themiddnight.github.io'} target={'blank'} underline={'hover'}>
                themiddnight.github.io
              </Link>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography fontSize={'small'}>GitHub:</Typography>
              <Link fontSize={'small'} href={'https://github.com/themiddnight'} target={'blank'} underline={'hover'}>
                themiddnight
              </Link>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography fontSize={'small'}>Project repositories:</Typography>
              <Link fontSize={'small'} href={'https://github.com/themiddnight/themiddnight.github.io'} target={'blank'} underline={'hover'}>
                Frontend
              </Link>
              <Link fontSize={'small'} href={'https://github.com/themiddnight/My-Resume-Web-API-Firebase'} target={'blank'} underline={'hover'}>
                Backend
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}