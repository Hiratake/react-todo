import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import FilterButton from './components/FilterButton'
import Form from './components/Form'
import Todo from './components/Todo'

const App = (props) => {
  const [tasks, setTasks] = useState(props.tasks)
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }
  const editTask = (id, newName) => {
    const editedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(editedTasks)
  }
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }
  const taskList = tasks.map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      onCompleted={toggleTaskCompleted}
      onEdit={editTask}
      onDelete={deleteTask}
    />
  ))
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`
  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}

App.propTypes = {
  tasks: PropTypes.array,
}

export default App
