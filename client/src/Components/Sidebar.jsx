import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { BsPersonFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
const Sidebar = ({isVisible}) => {
  return (
    <nav className={isVisible?'sidenav active':'sidenav'}>
        <ul>
            <li>
                <Link to="/"> <IoMdHome/>Home</Link>
            </li>
            <li>
                <Link to="/addpart"><IoMdAddCircle/>Add Part</Link>
            </li>
            <li>
                <Link to="/aboutus"> <BsPersonFill/>About Us</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Sidebar