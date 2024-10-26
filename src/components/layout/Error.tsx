import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      textAlign='center'
    >
      <Typography variant='h1' color='error' gutterBottom>
        Opps!
      </Typography>

      <Typography variant='body1' color='textSecondary' mb={3}>
        Something went wrong. Please try again.
      </Typography>
      <Button variant='contained' color='primary' onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  )
}

export default Error
