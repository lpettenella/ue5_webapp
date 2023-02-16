import React, { useEffect, useState } from 'react'
import { ActorSubclass } from '@dfinity/agent'
import { _SERVICE } from '../../../declarations/ue_template/ue_template.did'
import { SendToUE } from '../peer-stream';
import { BsUpload } from 'react-icons/bs'
import RegisterForm from '../components/RegisterForm';

type CreateProps = {
  isAuthenticated: boolean,
  actor: ActorSubclass<_SERVICE>
}

function Create({isAuthenticated, actor, principal, user, createUser}: any) {
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)
  const [loadingCreation, setLoadingCreation] = useState(false)

  console.log("USER -> ", user)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFile(file!)
  }

  const mintNft = async() => {
    const blob = new Blob([file!],{type: "model/gltf-binary"})
    const arrayBuffer = [...new Uint8Array(await blob.arrayBuffer())]
    setLoadingCreation(true)
    const res = await actor.mintToken(false, "model/gltf-binary", arrayBuffer, file?.name)
    setLoadingCreation(false)
    console.log(res)
  }

  useEffect(() => {
    if (!file) return 

    const url = URL.createObjectURL(new Blob([file], { type: 'model/gltf-binary' }))
    setUrl(url);
    
  }, [file]);

  return (
    user && 'Ok' in user ?
    <div className="app-body">
      <div className="create-container">
        <h1>Create New NFT</h1>
        <label className="nft-upload">
          <input type="file" style={{display:"none"}} onChange={handleChange} />
          <BsUpload /> 
          <div style={{fontSize: "2vh", margin: "1vh"}}>Choose a GLB File</div>
        </label>
        {url && (
          <div className="nft-mint">
            <a id="link" href={url}> {file?.name} </a>   
            <button onClick={() => mintNft()}>Create NFT</button>
          </div>
        )} 
      </div>
      { loadingCreation && 
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <div> Creating NFT... </div>
        </div> }
    </div> : user && 'Err' in user ? <RegisterForm createUser={createUser}/>
    : <div>You are not Authenticated! Please Login!</div>
  );
}

export default Create