import React from 'react'
import PropTypes from 'prop-types'

import logo from './logo.svg'
import './App.css'

const App = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, {props.subject}!
        </p>
      </header>
    </div>
  )
}

App.propTypes = {
  subject: PropTypes.string,
}

export default App
