import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NFTs from '../components/NFTs'

enum NavbarLinks {
  NFTS = "NFTs",
  COLLECTIONS = "Collections",
  USERS = "Users"
}

function Market({ isAuthenticated, actor, principal}: any) {

  const [activeSection, setActiveSection] = useState<string>(NavbarLinks.NFTS)

  const handleNavbar = (e: any) => {
    const el = e.target as HTMLElement
    setActiveSection(el.id)
  }

  const loadComponent = () => {
    switch (activeSection) {
      case NavbarLinks.NFTS: return <NFTs actor={actor} principal={principal} />;
      case NavbarLinks.COLLECTIONS: return <div>Collections</div>;
      default: return <div>Invalid option</div>;
    }
  }
  
  return (
    isAuthenticated ? (
      <div className="app-body">
        <div className="market-navbar">
          <div className="mrk-links">
            <NavButton text="NFTs" handle={handleNavbar} activeSection={activeSection}/>
            <NavButton text="Collections" handle={handleNavbar} activeSection={activeSection}/>
            <NavButton text="Users" handle={handleNavbar} activeSection={activeSection}/>
          </div>
          <div className="create-nft-btn">
            <Link to="/create">
              <span className="add-button-text">Create NFT</span>
              {/* <span className="add-button-plus">+</span> */}
            </Link>
          </div>
        </div>
        <div className="market-content">
          {loadComponent()}
        </div>
      </div>
    ) : !isAuthenticated ? (
      <div> You're not authenticated! Click Login!</div>
    ) : <div>Loading</div>
  )
}

const NavButton = ({ text, handle, activeSection }: { text: string, handle: any, activeSection: any }) => {
  var selected = activeSection === text
  return <div id={text} className={`market-navbar-btn ${selected ? 'selected' : ''}`} onClick={handle}>{text}</div>
}

export default Market