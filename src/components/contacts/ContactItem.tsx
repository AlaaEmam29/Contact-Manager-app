import { Contact } from '@types'
import { TableCell, TableRow, IconButton, Avatar, Typography, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'

interface ContactItemProps {
  contact: Contact
  index: number
  onDelete: (id: string) => void
  handleSendEmail: (email: string) => void
  handleCall: (phone: string) => void
}
export default function ContactItem({
  contact,
  index,
  onDelete,
  handleSendEmail,
  handleCall,
}: ContactItemProps) {
  return (
    <TableRow key={`${contact.login.uuid}`}>
      <TableCell sx={{ fontSize: '1rem' }}>{index + 1}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar alt={`${contact.name.first} ${contact.name.last}`} src={contact.picture.large} />
        <Typography sx={{ fontSize: '1rem' }} variant='subtitle2'>{`
              ${contact.name.title.charAt(0).toUpperCase() + contact.name.title.slice(1)}.
              ${contact.name.first} ${contact.name.last}`}</Typography>
      </TableCell>
      <TableCell>
        <Button
          color='primary'
          sx={{ fontSize: '1rem' }}
          variant='text'
          onClick={() => handleSendEmail(contact.email)}
        >
          {contact.email}
        </Button>
      </TableCell>
      <TableCell>
        <Button
          color='primary'
          sx={{ fontSize: '1rem' }}
          variant='text'
          onClick={() => handleCall(contact.phone)}
        >
          {contact.phone}
        </Button>
      </TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton component={Link} to={`/contact/${contact.login.uuid}/edit`}>
          <EditIcon color='success' />
        </IconButton>
        <IconButton onClick={() => onDelete(contact.login.uuid)}>
          <DeleteIcon color='error' />
        </IconButton>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to={`/contact/${contact.login.uuid}`}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  )
}
