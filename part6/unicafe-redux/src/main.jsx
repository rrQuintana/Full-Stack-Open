import React from 'react'
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'
import App from './app'

const store = configureStore({reducer: noteReducer})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)