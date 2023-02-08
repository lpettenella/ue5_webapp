import React from 'react'

function Market({ isAuthenticated }: any) {
  return (
    isAuthenticated ? (
      <div>
        Market
      </div>
    ) : (<div> You're not authenticated! Turn back!</div>)
  )
}

export default Market