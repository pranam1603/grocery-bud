import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'please enter something!', 'danger')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          } return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'value changed', 'success')
    } else {
      showAlert(true, 'item added successfully!', 'success')
      const newItems = { id: new Date().getTime().toString(), title: name }
      console.log(newItems);
      setList([...list, newItems])
      setName("")
    }
  }

  const handleDelete = (id) => {
    const newArray = list.filter(item => item.id !== id)
    showAlert(true, 'delete successfully', 'danger')
    setList(newArray)
  }

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  }

  const editItems = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(specificItem.id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]);

  return (
    <section className="section-center">
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className="grocery" placeholder="e.g. milk" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} handleDelete={handleDelete} editItems={editItems} />
          <button className="clear-btn" onClick={() => setList([])}>clear items</button>
        </div>
      )}
    </section>
  )
}

export default App
