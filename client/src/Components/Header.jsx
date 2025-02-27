import React from 'react'
import './Header.css'
import logo from './../assets/AB.png'
import { GiHamburgerMenu } from "react-icons/gi";
const Header = ({toggleNavbar}) => {
  return (
    <header>
        <GiHamburgerMenu onClick={toggleNavbar}/>
        <img src={logo} alt="" />
    </header>
  )
}

export default Header