import React from 'react'
import { Link } from 'react-router-dom'
const ActiveParts = () => {
  return (
    <>
          <h1>Select Divison</h1>
          <div className="button_container">
            <Link to='/active-parts/control-valve'>Control Valve</Link>
            <Link to='/active-parts/flow-meter'>Flow Meter</Link>
          </div>
        </>
  )
}

export default ActiveParts