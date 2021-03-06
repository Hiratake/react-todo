import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import FilterButton from './components/FilterButton'
import Form from './components/Form'
import Todo from './components/Todo'

const usePrevious = (val) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = val
  })
  return ref.current
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed,
}
const FILTER_NAMES = Object.keys(FILTER_MAP)

const App = (props) => {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')

  const listHeadingRef = useRef(null)

  const prevTaskLength = usePrevious(tasks.length)

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength])

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      onSet={setFilter}
    />
  ))

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
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
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
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
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
