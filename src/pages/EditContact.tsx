import { useParams } from 'react-router-dom'
import ContactForm from '@components/contacts/ContactForm'
import { useContact } from '@hooks/contacts/useContact'
import Loading from '@components/layout/Loading'
import ErrorElement from '@components/layout/ErrorElement'

const EditContact = () => {
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
  return <ContactForm contactToEdit={contact} />
}

export default EditContact
