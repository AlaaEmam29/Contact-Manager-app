import { useParams } from 'react-router-dom'
import { CardContent, Typography, Avatar, Box, Paper } from '@mui/material'
import { useContact } from '@hooks/contacts/useContact'
import Loading from '@components/layout/Loading'
import ErrorElement from '@components/layout/ErrorElement'
const ContactDetailContainer = () => {
  const { id } = useParams<{ id: string }>()

  const contactId = id ?? null

  const { data: contact, status, error } = useContact(contactId)
  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'failed') {
    return <ErrorElement error={error} />
  }
  if (!contact) {
    return <ErrorElement error='No contact found' color='info' />
  }

  return (
    <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
      <Box display='flex' justifyContent='center'>
        <Avatar
          alt={`${contact.name.first} ${contact.name.last}`}
          src={contact.picture.large}
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <CardContent>
        <Typography variant='h4' align='center'>
          {contact.name.first} {contact.name.last}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {contact.email}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {contact.phone}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {contact.location.street.number} {contact.location.street.name}, {contact.location.city}, {contact.location.state}, {contact.location.country}, {contact.location.postcode}
        </Typography>
      </CardContent>
    </Paper>
  )
}

export default ContactDetailContainer
