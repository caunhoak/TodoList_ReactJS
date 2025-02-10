import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    if (editIndex !== null) {
      const newTodoList = todos.map((todo, index) => 
        index === editIndex ? { ...todo, text: newTodo } : todo
      )
      persistData(newTodoList)
      setTodos(newTodoList)
      setEditIndex(null)
    } else {
      const newTodoList = [...todos, { text: newTodo, completed: false, deadline: null }]
      persistData(newTodoList)
      setTodos(newTodoList)
    }
    setTodoValue('')
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index].text
    setTodoValue(valueToBeEdited)
    setEditIndex(index)
  }

  function handleToggleComplete(index) {
    const newTodoList = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDateChange(index, date) {
    const newTodoList = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        return { ...todo, deadline: date }
      }
      return todo
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    console.log(localTodos)
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} handleToggleComplete={handleToggleComplete} handleDateChange={handleDateChange} todos={todos} />
    </>
  )
}

export default App