import { CircularProgress, Box, Typography } from '@mui/material'

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      gap: 2,
      position: 'fixed',
      width: '100%',
      zIndex: 9999,
      backgroundColor: 'white',
      flexDirection: 'column',
      top: 0,
      left: 0,
    }}
  >
    <CircularProgress />
    <Typography variant='h5' color='primary'>
      Loading...
    </Typography>
  </Box>
)
export default Loading
