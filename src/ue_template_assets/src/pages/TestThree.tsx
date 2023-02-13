import React, { useEffect, useState } from "react"
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { ActorSubclass } from '@dfinity/agent'
import { _SERVICE } from '../../../declarations/ue_template/ue_template.did'

function TestThree({actor, principal}: any) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [userNfts, setUserNfts] = useState<any[]>([]);
  const [loader] = useState(new GLTFLoader())
  const [scene] = useState(new THREE.Scene())
  const [camera] = useState(new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ))
  const [renderer] = useState(new THREE.WebGLRenderer())

  useEffect(() => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("mesh-box")!.appendChild( renderer.domElement );
  }, [])
  
  useEffect(() => {
    if (!file) return
    
    // const loader = new GLTFLoader();
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    // const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0, 0 )
    
    while(scene.children.length > 0){ 
      scene.remove(scene.children[0]); 
    }
    
    async function parseFile() {
      const blob = new Blob([file!], { type: 'application/gltf-binary' })
      const arraybuffer = await blob.arrayBuffer()
      
      loader.parse(arraybuffer, "", (glb) => {
        scene.add(glb.scene)
      })
    }
    parseFile()
    
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(2,2,5)
    scene.add(light)
    
    camera.position.z = 5;
    
    function animate() {
      requestAnimationFrame( animate );
      controls.update()
      renderer.render( scene, camera );
    }
    animate();
    
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    // loader.load(
    //   "Chair.glb",
    //   function ( glb ) {
    //     console.log(glb)
    //     scene.add( glb.scene );
    //   },
    //   function ( xhr ) {
    //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    //   },
    //   function ( error ) {
    //     console.log( error );
    //   }
    // );
  }, [file])

  const handleFile = (event: any) => {
    console.log("handle file")
    const file = event.target.files?.[0]
    setFile(file!)
  }

  const handleClick = async () => {
    const res = await actor.getUserTokens(principal)
    setUserNfts(res)
  }

  const handleNft = async(nft: any) => {
    const arraybuffer = nft.metadata[0].location.InCanister
    const file = new File([arraybuffer], "test.glb");
    setFile(file)
  }

  return (
    <>
      {/* <input type="file" onChange={handleFile} /> */}
      <button onClick={() => handleClick()}>Get NFTs</button>
      {userNfts.map((nft, key) => 
        <button key={key} onClick={() => handleNft(nft)}>
          {nft.metadata[0].name}
        </button>
      )}
      <div id="mesh-box"></div>
    </>
  )
}

export default TestThree