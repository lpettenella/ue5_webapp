import React, { useEffect, useState } from "react"

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
      <div className="nfts-filter">Filter</div>
      <div className="nfts-cards">
        {nfts.map((nft, key) => 
          <div className="nft-card" key={key}>NFT!</div>
        )}
      </div>
    </div>
  )
}

export default NFTs