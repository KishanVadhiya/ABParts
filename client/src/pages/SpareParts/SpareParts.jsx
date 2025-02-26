import React from 'react'
import { Link } from 'react-router-dom'
const SpareParts = () => {
  return (
    <>
    <h1>Select Divison</h1>
    <div className="button_container">
      <Link to='/spare-parts/control-valve'>Control Valve</Link>
      <Link to='/spare-parts/flow-meter'>Flow Meter</Link>
    </div>
  </>
  )
}

export default SpareParts