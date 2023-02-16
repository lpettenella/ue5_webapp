import React, { useEffect, useState } from "react"
import { BsFilter, BsFillArrowDownCircleFill } from 'react-icons/bs';
import TestThree from "../pages/TestThree";
import { SendToUE } from "../peer-stream";

function NFTs({actor, principal} : any) {
  const [nfts, setNfts] = useState<any[]>([])
  const [loadingTransfer, setLoadingTransfer] = useState(false)

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

  const handleTransfer = async() => {
    setLoadingTransfer(true)
    await SendToUE("data_response@" + "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Embedded/Duck.gltf")
    setLoadingTransfer(false)
  }

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
            <div className="nft-buttons">
              <a onClick={() => {handleTransfer()} } title="Transfer NFT to UE">
                <BsFillArrowDownCircleFill size={30}/>
              </a>
            </div>
          </div>
        )}
      </div>
      { loadingTransfer && 
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <div> Transfering... </div>
        </div> }
    </div>
  )
}

export default NFTs