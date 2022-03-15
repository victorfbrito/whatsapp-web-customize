const todos = (state = {counter: 1}, action) => {
    switch (action.type) {
      case 'INCREMENT':
          console.log('increment')
        return {
          ...state,
            counter: state.counter + 1
        }
      case 'REMOVE_VALUE':
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  
export default todos