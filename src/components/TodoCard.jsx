import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function TodoCard(props) {
    const { children, handleDeleteTodo, index, handleEditTodo, handleToggleComplete, handleDateChange, completed, deadline } = props
    return (
        <li className='todoItem' style={{ color: completed ? '#000' : '#aaa' }}>
            {children}
            <div className='actionsContainer'>
                <button onClick={() => {
                    handleEditTodo(index)
                }}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(index)
                }}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
                <button
                    onClick={() => {
                        handleToggleComplete(index)
                    }}
                    style={{ color: completed ? 'green' : 'gray' }}
                >
                    Done
                </button>
                <DatePicker
                    selected={deadline ? new Date(deadline) : null}
                    onChange={(date) => handleDateChange(index, date)}
                    placeholderText="Set deadline"
                />
            </div>
        </li>
    )
}