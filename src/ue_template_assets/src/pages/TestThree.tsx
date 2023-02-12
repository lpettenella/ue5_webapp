import React, { useEffect, useState } from "react"
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ActorSubclass } from '@dfinity/agent'
import { _SERVICE } from '../../../declarations/ue_template/ue_template.did'

function TestThree({actor, principal}: any) {
  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (!file) return

    const loader = new GLTFLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("mesh-box")!.appendChild( renderer.domElement );

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    async function parseFile() {
      const blob = new Blob([file!], { type: 'application/gltf-binary' })
      const arraybuffer = await blob.arrayBuffer()
      
      loader.parse(arraybuffer, "", (glb) => {
        console.log(glb)
        scene.add(glb.scene)
      })
    }

    parseFile()

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

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(2,2,5)
    scene.add(light)

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    animate();
  }, [file])

  const handleFile = (event: any) => {
    console.log("handle file")
    const file = event.target.files?.[0]
    setFile(file!)
  }

  const handleNft = async () => {
    const res = await actor.getUserTokens(principal)
    const arraybuffer = res[0].metadata[0].location.InCanister
    const file = new File([arraybuffer], "test.glb");
    setFile(file)
  }

  return (
    <>
      {/* <input type="file" onChange={handleFile} /> */}
      <button onClick={() => handleNft()}>Get NFTs</button>
      <div id="mesh-box"></div>
    </>
  )
}

export default TestThree