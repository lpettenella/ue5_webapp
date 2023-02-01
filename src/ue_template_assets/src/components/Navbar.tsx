import React from "react"

type NavbarProps = {
  setModalOpen: any
  logout: Function
  isAuthenticated: boolean
}

function Navbar({ setModalOpen, logout, isAuthenticated }: NavbarProps) {
  return (
    <div className="navbar">
      <div className="title">DfiniVerse</div>
      <div className="links">
        <a>DOCS</a>
        <a>COMMUNITY</a>
        <a>ABOUT</a>
        { !isAuthenticated?
            <a className="auth-btn" onClick={() => {setModalOpen(true)}}><b>AUTHENTICATE</b></a> :
            <a className="auth-btn" onClick={() => {logout()}}><b>LOGOUT</b></a>
        }
      </div>
    </div>
  )
}

export default Navbar