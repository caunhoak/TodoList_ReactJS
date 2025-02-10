import React from 'react'
import TodoCard from './TodoCard'

export default function TodoList(props) {
    const { todos } = props

    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <TodoCard {...props} key={todoIndex} index={todoIndex} completed={todo.completed} deadline={todo.deadline}>
                        <p>{todo.text}</p>
                    </TodoCard>
                )
            })}
        </ul>
    )
}