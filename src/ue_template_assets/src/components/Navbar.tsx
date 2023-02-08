import React from "react"

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
        <a>Docs</a>
        <a>Community</a>
        <a>About</a>
        { !isAuthenticated?
            <a className="auth-btn" onClick={() => {setModalOpen(true)}}>Login</a> :
            <a className="auth-btn" onClick={() => {logout()}}>Logout</a>
        }
      </div>
    </div>
  )
}

export default Navbar