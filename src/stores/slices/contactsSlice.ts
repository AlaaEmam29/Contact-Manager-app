import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Contact, ContactsState, LoaderState } from '@types'
import { fetchContacts } from '@services/contacts'
import {
  addContactToLocalStorage,
  updateContactInLocalStorage,
  deleteContactFromLocalStorage,
  setCurrentContactToLocalStorage,
  getAllContactsFromLocalStorage,
  getCurrentContactFromLocalStorage,
} from '@utils/localStorage'

const initialState: ContactsState = {
  list: getAllContactsFromLocalStorage(),
  status: 'idle',
  error: null,
  currentContact: getCurrentContactFromLocalStorage(),
  searchQuery: '',
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.list.push(action.payload)
      addContactToLocalStorage(action.payload)
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((contact: Contact) => contact.login.uuid !== action.payload)
      deleteContactFromLocalStorage(action.payload)
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.list.findIndex(
        (contact) => contact.login.uuid === action.payload.login.uuid,
      )
      if (index !== -1) {
        state.list[index] = action.payload
        updateContactInLocalStorage(action.payload)
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setLoader: (state, action: PayloadAction<LoaderState>) => {
      state.status = action.payload
    },
    getContactsById: (state, action: PayloadAction<string>) => {
      const currentContact =
        state.list.find((contact) => contact.login.uuid === action.payload) || null
      state.currentContact = currentContact
      if (currentContact) {
        setCurrentContactToLocalStorage(currentContact)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
        state.error = null
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed'
        let errorMessage: string

        if (typeof action.error.message === 'string') {
          errorMessage = action.error.message
        } else if (typeof action.payload === 'string') {
          errorMessage = action.payload
        } else {
          errorMessage = 'Failed to fetch contacts'
        }
        state.error = errorMessage
      })
  },
})

export const {
  addContact,
  deleteContact,
  editContact,
  setSearchQuery,
  setLoader,
  getContactsById,
} = contactsSlice.actions
export default contactsSlice.reducer
