import { memo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { Contact } from '@types'
import ContactItem from './ContactItem'

interface ContactListTableProps {
  contacts: Contact[]
  order: 'asc' | 'desc'
  orderBy: string
  handleSortRequest: (property: string) => void
  onDelete: (id: string) => void
}

const ContactListTable = ({
  contacts,
  order,
  orderBy,
  handleSortRequest,
  onDelete,
}: ContactListTableProps) => {
  const handleSendEmail = (email: string) => {
    window.location.href = `mailto:${email}`
  }
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'name'}
              direction={order}
              onClick={() => handleSortRequest('name')}
            >
              Name
            </TableSortLabel>
          </TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts?.map((contact, index: number) => {
          return (
            <ContactItem
              key={contact.login.uuid}
              contact={contact}
              index={index}
              onDelete={onDelete}
              handleSendEmail={handleSendEmail}
              handleCall={handleCall}
            />
          )
        })}
        {contacts.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} align='center'>
              No contacts found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default memo(ContactListTable)
