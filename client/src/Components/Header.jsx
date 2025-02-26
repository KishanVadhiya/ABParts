import React from 'react'
import './Header.css'
import { GiHamburgerMenu } from "react-icons/gi";
const Header = ({toggleNavbar}) => {
  return (
    <header>
        <GiHamburgerMenu onClick={toggleNavbar}/>
    </header>
  )
}

export default Header