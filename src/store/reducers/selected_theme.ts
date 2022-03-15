import * as ts from '../../types'

const initialState: ts.ThemeItemType = {
  data: {
    title: '',
    path: '',
    type: '',
    artist: null
  }
}

const selected_theme = (state = initialState, action: ts.ThemeItemDispatch) => {
    switch (action.type) {
      case 'REMOVE_THEME':
        return initialState
      case 'SELECT_THEME':
        return {
          ...state,
            data: action.data
        }
      default:
        return state
    }
  }
  
export default selected_theme