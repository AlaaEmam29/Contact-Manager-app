import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
  addContactToLocalStorage,
  deleteContactFromLocalStorage,
  updateContactInLocalStorage,
  getAllContactsFromLocalStorage,
} from '@utils/localStorage'
import { addContact, deleteContact, editContact } from '@stores/slices/contactsSlice'
import { Contact } from '@types'

export const useLocalStorageContacts = () => {
  const dispatch = useDispatch()

  const addNewContact = (contact: Contact) => {
    try {
      addContactToLocalStorage(contact)
      dispatch(addContact(contact))
    } catch (error) {
      console.error('Failed to add contact to localStorage:', error)
    }
  }

  const editExistingContact = (contact: Contact) => {
    try {
      updateContactInLocalStorage(contact)
      dispatch(editContact(contact))
    } catch (error) {
      console.error('Failed to edit contact in localStorage:', error)
    }
  }

  const deleteExistingContact = (uuid: string) => {
    try {
      deleteContactFromLocalStorage(uuid)
      dispatch(deleteContact(uuid))
    } catch (error) {
      console.error('Failed to delete contact from localStorage:', error)
    }
  }

  useEffect(() => {
    const syncContacts = () => {
      try {
        const contacts = getAllContactsFromLocalStorage()
        contacts.forEach((contact: Contact) => dispatch(addContact(contact)))
      } catch (error) {
        console.error('Failed to sync contacts from localStorage:', error)
      }
    }
    syncContacts()
  }, [dispatch])

  return {
    addNewContact,
    editExistingContact,
    deleteExistingContact,
  }
}
