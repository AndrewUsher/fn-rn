import { combineReducers } from 'redux'

export const initialState = {
  open: false
}

export const sideNavDrawer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        open: !state.open
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  sideNavDrawer
})

export default rootReducer
