import { Box, Alert } from '@mui/material'
interface ErrorElementProps {
  error: any
  color?: 'error' | 'warning' | 'info' | 'success'
}
export default function ErrorElement({ error, color = 'error' }: ErrorElementProps) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '20rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Alert variant='filled' severity={color}>
        {error || 'Something went wrong. Please try again later.'}
      </Alert>
    </Box>
  )
}
