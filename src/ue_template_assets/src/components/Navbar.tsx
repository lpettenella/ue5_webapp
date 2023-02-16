import React from "react"
import { Link } from "react-router-dom"

type NavbarProps = {
  setModalOpen: any
  logout: Function
  isAuthenticated: boolean
}

function Navbar({ setModalOpen, logout, isAuthenticated }: NavbarProps) {
  return (
    <div className="navbar">
      <div className="title">LucidDoor</div>
      <div className="links">
        <Link to="/create">Create</Link>
        <Link to="/market">Market</Link>
        <a>Explore</a>
        { !isAuthenticated?
            <a className="auth-btn" onClick={() => {setModalOpen(true)}}>Login</a> :
            <a className="auth-btn" onClick={() => {logout()}}>Logout</a>
        }
      </div>
    </div>
  )
}

export default Navbar