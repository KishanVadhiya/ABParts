import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
const Home = () => {

  return (
    <>
      <h1>Select Part Type</h1>
      <div className="button_container">
        <Link to='/active-parts'>Active Parts</Link>
        <Link to='/spare-parts'>Spare Parts</Link>
      </div>
    </>
  )
}

export default Home