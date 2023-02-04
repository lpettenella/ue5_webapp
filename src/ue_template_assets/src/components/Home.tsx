import React from 'react'
import AuthHome from './AuthHome'
import RegisterForm from './RegisterForm'

function Home({ isAuthenticated, user, createUser}: any) {
  return (
    <>
      { isAuthenticated && 
        <div className="home-body">
				{ user && 'Ok' in user ? (
					<AuthHome />
				) : user && 'Err' in user ? (
					<RegisterForm createUser={createUser}/>
				) : <div>Loading</div>}
        </div>
			}
		</>
  )
}

export default Home