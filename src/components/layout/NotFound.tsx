import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
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
      <Typography variant='h1' color='primary' gutterBottom>
        404
      </Typography>
      <Typography variant='h4' gutterBottom>
        Oops! Page not found
      </Typography>
      <Typography variant='body1' color='textSecondary' mb={3}>
        The page you’re looking for doesn’t exist or was moved.
      </Typography>
      <Button variant='contained' color='primary' onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  )
}

export default NotFoundPage
