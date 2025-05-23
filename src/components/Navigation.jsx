import React from 'react'
import { NavLink } from "react-router-dom";
import s from './Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={s.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? s.activeLink : s.navLink}>Home
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => isActive ? s.activeLink : s.navLink}>Movies
          </NavLink>
    </nav>
  )
}

export default Navigation
