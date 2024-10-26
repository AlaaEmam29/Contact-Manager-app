import { Contact } from '@types'

const STORAGE_KEY = 'contacts'
const STORAGE_CURRENT_USER_KEY = 'currentContact'

const saveContactsToLocalStorage = (contacts: Contact[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

const getContactsFromLocalStorage = (): Contact[] => {
  const storedContacts = localStorage.getItem(STORAGE_KEY)
  return storedContacts ? JSON.parse(storedContacts) : []
}

const addContactToLocalStorage = (contact: Contact) => {
  const contacts = getContactsFromLocalStorage()
  contacts.push(contact)
  saveContactsToLocalStorage(contacts)
}

const updateContactInLocalStorage = (contact: Contact) => {
  const contacts = getContactsFromLocalStorage()
  const index = contacts.findIndex((c) => c.login.uuid === contact.login.uuid)
  if (index !== -1) {
    contacts[index] = contact
    saveContactsToLocalStorage(contacts)
  }
}

const deleteContactFromLocalStorage = (uuid: string) => {
  const contacts = getContactsFromLocalStorage()
  const filteredContacts = contacts.filter((contact) => contact.login.uuid !== uuid)
  saveContactsToLocalStorage(filteredContacts)
}

const getAllContactsFromLocalStorage = (): Contact[] => {
  return getContactsFromLocalStorage()
}
const setAllContactsToLocalStorage = (contacts: Contact[]) => {
  saveContactsToLocalStorage(contacts)
}
const getCurrentContactFromLocalStorage = (): Contact | null => {
  const storedCurrentContact = localStorage.getItem(STORAGE_CURRENT_USER_KEY)
  return storedCurrentContact ? JSON.parse(storedCurrentContact) : null
}
const setCurrentContactToLocalStorage = (contact: Contact) => {
  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(contact))
}

export {
  addContactToLocalStorage,
  updateContactInLocalStorage,
  deleteContactFromLocalStorage,
  getAllContactsFromLocalStorage,
  getCurrentContactFromLocalStorage,
  setCurrentContactToLocalStorage,
  setAllContactsToLocalStorage,
}
