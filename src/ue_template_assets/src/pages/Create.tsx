import React, { useEffect, useState } from 'react'
import { ActorSubclass } from '@dfinity/agent'
import { _SERVICE } from '../../../declarations/ue_template/ue_template.did'
import { SendToUE } from '../peer-stream';

type CreateProps = {
  isAuthenticated: boolean,
  actor: ActorSubclass<_SERVICE>
}

function Create({isAuthenticated, actor, principal}: any) {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file!);
  };

  const mintNft = async() => {
    const blob = new Blob([file!],{type: "model/gltf-binary"}); 
    const arrayBuffer = [...new Uint8Array(await blob.arrayBuffer())];

    const res = actor.mintToken(false, "model/gltf-binary", arrayBuffer, file?.name)
    console.log("mint result ...")
    console.log(res)
  }

  const getNfts = async() => {
    const res = await actor.getUserTokens(principal)
    console.log(res)
    const arraybuffer = res[0].metadata[0].location.InCanister
    const file = new File([arraybuffer], "test.glb");
    // const url = URL.createObjectURL(new Blob([file], { type: 'application/gltf-binary' }))
    // console.log(url)
    setFile(file)
  }

  useEffect(() => {
    if (!file) return 

    const url = URL.createObjectURL(new Blob([file], { type: 'model/gltf-binary' }))
    setUrl(url);
    
  }, [file]);

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {url && (
        <>
        <a id="link" href={url}> {file?.name} </a>   
        <button onClick={() => mintNft()}>Mint Nft</button>
				{/* <button onClick={async(e) => {
          let button = e.currentTarget.classList
          button.add("disabled")               
          SendToUE("data_response@" + url)
          button.remove("disabled")                      
				}}>Send Data</button> */}
        </>
      )}
      <button onClick={() => getNfts()}>Get Nfts</button>
    </div>
  );
}

export default Create