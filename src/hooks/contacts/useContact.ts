import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@stores/store'
import { getContactsById } from '@stores/slices/contactsSlice'
import { useContacts } from './useContacts'
import { setLoader } from '@stores/slices/contactsSlice'

export const useContact = (id: string | null) => {
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.contacts.currentContact)
  const status = useSelector((state: RootState) => state.contacts.status)
  const error = useSelector((state: RootState) => state.contacts.error)
  const contacts = useSelector((state: RootState) => state.contacts.list)
  const { refetch } = useContacts()

  useEffect(() => {
    if (id) {
      dispatch(getContactsById(id))
    }
  }, [id, dispatch])

  if (!id) return { data: null, status: 'idle', error: 'No id provided' }
  useEffect(() => {
    if (contacts.length === 0) {
      const fetchData = async () => {
        dispatch(setLoader('loading'))
        refetch?.()
      }
      fetchData()
        .then(() => {
          dispatch(getContactsById(id))
        })
        .finally(() => {
          dispatch(setLoader('idle'))
        })
    } else {
      dispatch(getContactsById(id))
    }
  }, [id, contacts.length])

  return { data, status, error }
}
