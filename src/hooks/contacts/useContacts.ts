import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@stores/store'
import { fetchContacts } from '@services/contacts'
import { setAllContactsToLocalStorage } from '@utils/localStorage'

export const useContacts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { list: data, status, error } = useSelector((state: RootState) => state.contacts)

  useEffect(() => {
    let promise: any = null

    const fetchData = () => {
      if (status === 'idle' && data.length === 0) {
        promise = dispatch(fetchContacts())
      }
    }

    fetchData()

    return () => {
      promise?.abort?.()
    }
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      setAllContactsToLocalStorage(data)
    }
  }, [data])

  const refetch = () => {
    dispatch(fetchContacts())
  }

  return { data, status, error, refetch }
}
