import router from './routes'
import { RouterProvider } from 'react-router-dom'
import './index.css'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App