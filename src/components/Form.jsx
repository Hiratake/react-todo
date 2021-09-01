import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Form = (props) => {
  const [name, setName] = useState('')

  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      props.onSubmit(name)
      setName('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
}

export default Form
