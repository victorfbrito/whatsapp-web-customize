import * as ts from '../../types'

let nextTodoId = 0
export const addTodo = (text: string) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter: any) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id: any) => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const increment = (nmr: number) => ({
    type: 'INCREMENT',
    nmr
})

export const changeTheme = (data: ts.ThemeItemType) => ({
    type: 'SELECT_THEME',
    data: data
})

export const removeTheme = () => ({
    type: 'REMOVE_THEME'
})