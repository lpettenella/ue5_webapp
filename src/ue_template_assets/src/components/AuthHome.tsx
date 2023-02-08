import React from "react"
import { Link } from "react-router-dom"

function AuthHome() {
  return (
    <div className="auth-home">
      <div className="home-row"> 
        <Link to="/rooms"><h1>Explore Rooms</h1></Link>
        <Link to="/wallet"><h1>Wallet</h1></Link>
      </div>
      <div className="home-row">
        <Link to="/market"><h1>Market</h1></Link>
        <Link to="/profile"><h1>Your Profile</h1></Link>
      </div>
    </div>
  )
}

export default AuthHome