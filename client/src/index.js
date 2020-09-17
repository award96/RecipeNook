import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {UserContextProvider} from './userContext'
import {WindowSizeContextProvider} from './windowSizeContext'
import ScrollToTop from './ScrollToTop'
import App from './App'
import * as serviceWorker from './serviceWorker'

/*
  Wrap app in
    Router
    User Context

  Pair app with
    Scroll to top function
      (scrolls to top when the route changes)
*/
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <WindowSizeContextProvider>
          <ScrollToTop />
          <App />
        </WindowSizeContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
