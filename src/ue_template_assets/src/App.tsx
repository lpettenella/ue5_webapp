import * as React from 'react'
import { AuthClient } from "@dfinity/auth-client"
import { canisterId, createActor, ue_template } from '../../declarations/ue_template'
import { ActorSubclass } from '@dfinity/agent'
import { UserResult, _SERVICE } from '../../declarations/ue_template/ue_template.did'
import { SendToUE } from './peer-stream'
import Navbar from './components/Navbar'
import PolicyModal from './components/PolicyModal'
import { Principal } from '@dfinity/principal'
import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Market from './pages/Market'
import Create from './pages/Create'
import TestThree from './pages/TestThree'
// import logo from './logo.png';

export const AppContext = React.createContext<{
	authClient?: AuthClient
	setIsAuthenticated?: React.Dispatch<boolean>
	actor?: ActorSubclass<_SERVICE> | undefined        
}>({})

//Handle Received Messages from Unreal
export async function ReceivedFromUnreal(detail : string){
	let option = detail.split("@")[0]
	let message = detail.split("@")[1]
	let colorBtn = document.getElementById("change_color_btn") as HTMLElement
	
	switch (option) {
			case "canister_call" : {
					console.log("canister_call:  " + message)
					//Call main.mo function: "greet"
					SendToUE("can_response@" + await ue_template.greet(message))                    
					break
			}

			case "updateColor" : {
					console.log("updateColor: " + message) 
					colorBtn.className=""
					colorBtn.classList.add(message)                  
					break
			}

		default: console.log("unknown message")
	}
}

type Auth = {
	isAuthenticated: boolean,
	principal: Principal,
	actor: ActorSubclass<_SERVICE>
}

const App = () => {
	const [authClient, setAuthClient] = useState<AuthClient | undefined>(undefined)
	const [actor, setActor] = useState<ActorSubclass<_SERVICE> | undefined>(undefined)        
	const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [principal, setPrincipal] = useState<Principal | undefined>(undefined)
	const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState<UserResult | undefined>(undefined)
					
	let colorIndex = 0
	function RandomColor(){
			let color = ["red", "green", "blue", "orange"]
			colorIndex == 3 ? colorIndex = 0 : ++colorIndex
			console.log(colorIndex)
			return color[colorIndex]
	}

	//Internet-Identity Login
	useEffect(() => {
		AuthClient.create().then(async (client)=>{
			setAuthClient(client)
			setIsAuthenticated(await client.isAuthenticated());      
			const identity = client.getIdentity()
			const principal = client.getIdentity().getPrincipal()
			const actor = createActor(canisterId as string, {
				agentOptions: {
						identity
				}
			})
			setActor(actor)
			setPrincipal(principal)         
		})
	}, [])

	useEffect(() => {
		if(!authClient) return

    async function checkUser() {
      const res: UserResult = await actor!.getUser(principal!)
      setUser(res)
    } 
    checkUser()
	}, [isAuthenticated])

  const createUser = async(e: any) => {
		e.preventDefault()
		const name = (document.getElementById("inputName") as HTMLInputElement).value
		const surname = (document.getElementById("inputSurname") as HTMLInputElement).value
    const username = (document.getElementById("inputUsername") as HTMLInputElement).value
    const res = await actor?.createUser([name], [surname], [username])
		setUser(res)
  }

	const authenticate = async() => {
		await authClient?.login({
			onSuccess: () => { setIsAuthenticated?.(true); setModalOpen?.(false); },
			identityProvider: process.env.II_URL,
		});         
	}

	const logout = async() => {
		await authClient?.logout()
		setIsAuthenticated?.(false)
	}

	return (
		<>
			<Navbar setModalOpen={setModalOpen} logout={logout} isAuthenticated={isAuthenticated}/>
			<PolicyModal authenticate={authenticate} modalOpen={modalOpen} setModalOpen={setModalOpen} />
			<Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} createUser={createUser} />} />
        <Route path="/market" element={<Market isAuthenticated={isAuthenticated} actor={actor} principal={principal} />} />
				<Route path="/create" element={<Create isAuthenticated={isAuthenticated} actor={actor} principal={principal} />} />
				{/* <Route path="/test" element={<TestThree principal={principal} actor={actor} />}></Route> */}
        {/* <Route path="/create" element={<Create isAuthenticated={isAuthenticated} />} />
        <Route path="/token/:id" element={<Token isAuthenticated={isAuthenticated} />} /> */}
      </Routes>
			{/* <Home isAuthenticated={isAuthenticated} user={user} createUser={createUser} /> */}


			{/* <div className="iitext">
				Your internet identity: {authClient?.getIdentity().getPrincipal() + ""}
			</div> */}

			<script src="peer-stream.js"></script>
			<video is="peer-stream" ref={elm => elm && elm.setAttribute('signal', 'ws://localhost:88')} >
					<track default kind="captions" srcLang="en" />
			</video>
			

      {/* <button onClick={async(e) => {
        let button = e.currentTarget.classList
        button.add("disabled")
        SendToUE("direct_response@call")                      
        SendToUE("can_response@" + await ue_template.greet("Unreal Player!"))
        button.remove("disabled")                      
      }}>Canister Call</button>

      <button id="change_color_btn" onClick={(e) => {
        let color = RandomColor()
        SendToUE("direct_response@" + color)
        e.currentTarget.className = ""
        e.currentTarget.classList.add(color)                    
      }}>Change Color</button> */}
        
		</>
	)
}






export default App