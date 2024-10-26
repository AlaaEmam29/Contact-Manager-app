import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '@stores/store'
import AppTheme from '@theme/AppTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppTheme>
        <App />
      </AppTheme>
    </Provider>
  </StrictMode>,
)
