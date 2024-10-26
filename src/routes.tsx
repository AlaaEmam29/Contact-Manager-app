import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@components/layout/AppLayout'
import Loading from '@components/layout/Loading'
import NotFound from '@components/layout/NotFound'
import Error from '@components/layout/Error'

const ContactList = React.lazy(() => import('@pages/ContactList'))
const ContactDetail = React.lazy(() => import('@pages/ContactDetail'))
const AddContact = React.lazy(() => import('@pages/AddContact'))
const EditContact = React.lazy(() => import('@pages/EditContact'))
const About = React.lazy(() => import('@pages/About'))
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <ContactList />
        </Suspense>
      </AppLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/contact/:id',
    element: (
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <ContactDetail />
        </Suspense>
      </AppLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/contact/:id/edit',
    element: (
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <EditContact />
        </Suspense>
      </AppLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/contacts/new',
    element: (
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <AddContact />
        </Suspense>
      </AppLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/about',
    element: (
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      </AppLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
    errorElement: <Error />,
  },
])

export default router
