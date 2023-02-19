import React from 'react'
import AuthHome from './AuthHome'
import RegisterForm from './RegisterForm'

function Home({ isAuthenticated, user, createUser}: any) {
  return (
    <>
      <div className="home-body">
      { isAuthenticated ? 
        ( user && 'Ok' in user ? (
          <AuthHome />
          ) : user && 'Err' in user ? (
            <RegisterForm createUser={createUser}/>
            ) : <div>Loading</div>)
       : (<div className="door-image">Welcome to LuciDDoor</div>) }
      </div>
		</>
  )
}

export default Home