import React, { useEffect, useState } from "react"
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { ActorSubclass } from '@dfinity/agent'
import { _SERVICE } from '../../../declarations/ue_template/ue_template.did'

function TestThree({nft, number}: any) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [userNfts, setUserNfts] = useState<any[]>([]);
  const [loader] = useState(new GLTFLoader())
  const [scene] = useState(new THREE.Scene())
  const [camera] = useState(new THREE.PerspectiveCamera( 20, 1, 0.1, 2000 ))
  const [renderer] = useState(new THREE.WebGLRenderer({ alpha: true }))

  useEffect(() => {
    const canvas = renderer.domElement;
    renderer.setSize( 200, 200);
    document.getElementById(`mesh-box${number}`)!.appendChild( canvas );
    
    // Set the aspect ratio of the camera to match the aspect ratio of the canvas
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }, [])
  
  useEffect(() => {
    const arraybuffer = nft.metadata[0].location.InCanister
    const file = new File([arraybuffer], "test.glb");
  
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set(0, 1, 0);
    
    var light = new THREE.PointLight( 0xffffff, 1 );
    camera.position.set(0, 1, 10);
    camera.add( light );

    async function parseFile() {
      const blob = new Blob([file!], { type: 'application/gltf-binary' })
      const arraybuffer = await blob.arrayBuffer()
      
      loader.parse(arraybuffer, "", (glb) => {
        scene.add(glb.scene)
        scene.add(camera)
        // scene.background = new THREE.Color( "grey" );
      })
    }
    parseFile()
    
    
    function animate() {
      requestAnimationFrame( animate );
      controls.update()
      renderer.render( scene, camera );
    }
    animate();
  }, [])

  // const handleClick = async () => {
  //   const res = await actor.getUserTokens(principal)
  //   setUserNfts(res)
  // }

  const handleNft = async(nft: any) => {
    const arraybuffer = nft.metadata[0].location.InCanister
    const file = new File([arraybuffer], "test.glb");
    setFile(file)
  }

  return (
    <>
      {/* <input type="file" onChange={handleFile} /> */}
      {/* <button onClick={() => handleClick()}>Get NFTs</button>
      {userNfts.map((nft, key) => 
        <button key={key} onClick={() => handleNft(nft)}>
          {nft.metadata[0].name}
        </button>
      )} */}
      <div id={`mesh-box${number}`}></div>
    </>
  )
}

export default TestThree