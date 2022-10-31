import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@features/app/App'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from '@/components/global-styles'
import store from '@features/redux/store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalStyles>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
