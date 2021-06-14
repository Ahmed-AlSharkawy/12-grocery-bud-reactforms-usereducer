import React, { useRef, useEffect, useReducer } from 'react'
import List from './List'
import Alert from './Alert'
import { reducer } from './reducer'
import './index.css'

const getList = () => {
  let list = localStorage.getItem('list')
  if (list) list = JSON.parse(localStorage.getItem('list'))
  else list = []
  return list
}

// name, list[], isEditing, editID, hint{display, msg, msgType}
const defaultState = {
  name: '',
  list: getList(),
  isEditing: false,
  editID: null,
  hint: { display: false, msg: '', msgType: '' },
}

function App() {
  const nameRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.list))
  }, [state.list])
  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!state.name) {
      showHint(true, 'empty values', 'danger')
    } else if (state.name && state.isEditing) {
      dispatch({ type: 'FINISH_EDIT' })
      showHint(true, 'item updated', 'success')
    } else {
      dispatch({ type: 'ADD_ITEM' })
      showHint(true, 'item added', 'success')
    }
    nameRef.current.focus()
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    showHint(true, 'item deleted', 'danger')
    nameRef.current.focus()
  }

  const editItem = (id) => {
    const name = state.list.find((val) => val.id === id).title
    dispatch({ type: 'START_EDIT', payload: { id, name } })
    nameRef.current.focus()
    showHint(true, 'start editing', 'success')
  }

  const showHint = (display = false, msg, msgType) => {
    dispatch({ type: 'SHOW_HINT', payload: { display, msg, msgType } })
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        <div className='hint-container'>
          {state.hint.display && (
            <Alert {...state.hint} removeHint={showHint} list={state.list} />
          )}
        </div>
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={state.name}
            ref={nameRef}
            onChange={(e) =>
              dispatch({ type: 'ALTER_NAME', payload: e.target.value })
            }
          />
          <button type='submit' className='submit-btn'>
            {state.isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {state.list.length > 0 && (
        <div className='grocery-container'>
          <List
            items={state.list}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button
            className='clear-btn'
            onClick={() => {
              dispatch({ type: 'CLEAR_ITEMS' })
              showHint(true, 'empty list', 'danger')
              nameRef.current.focus()
            }}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
