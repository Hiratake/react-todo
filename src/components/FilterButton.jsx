import React from 'react'
import PropTypes from 'prop-types'

const FilterButton = (props) => {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.onSet(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  )
}

FilterButton.propTypes = {
  name: PropTypes.string,
  isPressed: PropTypes.bool,
  onSet: PropTypes.func,
}

export default FilterButton
