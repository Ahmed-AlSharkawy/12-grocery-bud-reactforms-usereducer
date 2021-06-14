export const reducer = (state, action) => {
  if (action.type === 'ALTER_NAME') {
    return { ...state, name: action.payload }
  } else if (action.type === 'SHOW_HINT') {
    return { ...state, hint: action.payload }
  } else if (action.type === 'START_EDIT') {
    return {
      ...state,
      isEditing: true,
      editID: action.payload.id,
      name: action.payload.name,
    }
  } else if (action.type === 'FINISH_EDIT') {
    const newList = state.list.map((item) => {
      if (item.id === state.editID) item.title = state.name
      return item
    })
    return {
      ...state,
      name: '',
      list: newList,
      isEditing: false,
      editID: null,
    }
  } else if (action.type === 'ADD_ITEM') {
    let length = state.list.length
    let newID = 0
    if (length) newID = state.list[length - 1].id + 1

    const newItem = { id: newID, title: state.name }
    const newList = [...state.list, newItem]

    return {
      ...state,
      name: '',
      list: newList,
    }
  } else if (action.type === 'REMOVE_ITEM') {
    const newList = state.list.filter((item) => item.id !== action.payload)
    return { ...state, list: newList }
  } else if (action.type === 'CLEAR_ITEMS') {
    return { ...state, list: [] }
  }
  throw new Error('Wrong Input!')
}
