import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import todos from './todos'
import counter from './counter'
import selected_theme from './selected_theme'

export default combineReducers({
  counter,  
  todos,
  selected_theme,
  visibilityFilter
})