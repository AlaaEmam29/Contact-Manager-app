import { titleOptionsType } from '@utils/constants'
interface Location {
  street: {
    number: number | string | undefined
    name: string
  }
  city: string
  state: string
  country: string
  postcode:   number | string | undefined
}
type Title = (typeof titleOptionsType)[number]
interface Contact {
  name: {
    title: Title
    first: string
    last: string
  }

  email: string
  login: {
    uuid: string
    username: string
  }

  phone: string

  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  location: Location

}

type LoaderState = 'idle' | 'loading' | 'succeeded' | 'failed'

interface ContactsState {
  list: Contact[]
  status: LoaderState
  error: string | null
  currentContact: Contact | null
  searchQuery: string | null
}

export type { Contact, ContactsState, LoaderState, Title }
