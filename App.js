import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import AppNavigator from './Components/AppNavigator'
// import NavBar from './Components/NavBar'

const store = createStore(rootReducer, applyMiddleware(thunk))
console.log("TCL: store", store.getState())

export default function App () {
  return (
    <Provider store={store}>
      {/* <NavBar /> */}
      <AppNavigator />
    </Provider>
  )
}
