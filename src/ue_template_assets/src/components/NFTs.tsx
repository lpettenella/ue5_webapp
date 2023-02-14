import React, { useEffect, useState } from "react"
import { BsFilter } from 'react-icons/bs';
import TestThree from "../pages/TestThree";

function NFTs({actor, principal} : any) {
  const [nfts, setNfts] = useState<any[]>([])

  useEffect(() => {
    const getUserNfts = async() => {
      const res = await actor.getUserTokens(principal)
      console.log(res)
      const arraybuffer = res[0].metadata[0].location.InCanister
      const file = new File([arraybuffer], "test.glb");
      setNfts(res)
    }
    getUserNfts()
  }, [])

  return (
    <div className="nfts-body">
      <div className="nfts-filter">
        <BsFilter size={50}/>
        <hr
          style={{
            background: 'white',
            color: 'white',
            width: '10vh'
          }}
        />
        <div>Price</div>
        <div>Type</div>
        <div>Collection</div>
      </div>
      <div className="nfts-cards">
        {nfts.map((nft, key) => 
          <div className="nft-card" key={key}>
            <div className="nft-body"><TestThree nft={nft} number={key} /></div>
            <div className="nft-bottom">{nft.metadata[0].name}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NFTs