import React, { useState, useMemo, useEffect } from 'react'
import { Box, Button, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useContacts } from '@hooks/contacts/useContacts'
import { useDebounce } from '@hooks/useDebounce'
import ContactListTable from '@components/contacts/ContactListTable'
import ContactPagination from '@components/contacts/ContactPagination'
import ConfirmDialog from '@components/layout/ConfirmDialog'
import LetterTabs from '@components/contacts/LetterTabs'
import Loading from '@components/layout/Loading'
import { AddCircleRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import ErrorElement from '@components/layout/ErrorElement'
import { AppDispatch } from '@stores/store'
import { deleteContact } from '@stores/slices/contactsSlice'

const ContactListContainer = () => {
  const { data: contacts, status, error } = useContacts()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState('name')
  const searchQuery = useSelector((state: any) => state.contacts.searchQuery)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filteredLetter, setFilteredLetter] = useState<string | null>(null)
  const debouncedSearchQuery = useDebounce(searchQuery, 450)
  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
    setConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteContact(deleteId))
    }
    setConfirmOpen(false)
    setDeleteId(null)
  }

  const uniqueLetters = [
    ...new Set(contacts.map((contact) => contact.name.first[0].toUpperCase())),
  ].sort()
  if (uniqueLetters.length > 1) uniqueLetters.unshift('ALL')
  const handleLetterFilter = (letter: string) => {
    if (letter === 'ALL') return setFilteredLetter(null)
    setFilteredLetter(letter)
    setPage(0)
  }

  let filteredContacts = useMemo(() => {
    let result = contacts

    if (filteredLetter) {
      result = result.filter((contact) => contact.name.first.startsWith(filteredLetter))
    }

    if (debouncedSearchQuery) {
      result = result.filter((contact) =>
        `${contact.name.first} ${contact.name.last}`
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()),
      )
    }

    return result
  }, [contacts, filteredLetter, debouncedSearchQuery])

  const sortedContacts = useMemo(() => {
    return filteredContacts.slice().sort((a, b) => {
      const isAsc = order === 'asc'
      return isAsc
        ? a.name.first.localeCompare(b.name.first)
        : b.name.first.localeCompare(a.name.first)
    })
  }, [filteredContacts, order])

  const paginatedContacts = useMemo(() => {
    if (debouncedSearchQuery || filteredLetter) {
      return sortedContacts
    } else {
      return sortedContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }
  }, [sortedContacts, debouncedSearchQuery, filteredLetter, page, rowsPerPage])
  const handleAddNewContact = () => {
    navigate('/contacts/new')
  }
  useEffect(() => {
    setPage(0)
  }, [debouncedSearchQuery, filteredLetter])

  if (status === 'loading') return <Loading />
  if (status === 'failed') return <ErrorElement error={error} />
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button
          variant='contained'
          color='info'
          startIcon={<AddCircleRounded />}
          onClick={handleAddNewContact}
        >
          Add New Contact
        </Button>
      </Box>
      <Paper sx={{ width: '100%' }}>
        {uniqueLetters.length > 0 && (
          <LetterTabs letters={uniqueLetters} onLetterSelect={handleLetterFilter} />
        )}
        <Box
          sx={{
            width: '100%',
            overflowX: 'auto',
          }}
        >
          <ContactListTable
            contacts={paginatedContacts}
            order={order}
            orderBy={orderBy}
            handleSortRequest={handleSortRequest}
            onDelete={handleDelete}
          />
          {sortedContacts.length > rowsPerPage && (
            <ContactPagination
              count={sortedContacts.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Box>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
          title='Confirm Delete'
          content='Are you sure you want to delete this contact?'
        />
      </Paper>
    </>
  )
}

export default ContactListContainer
