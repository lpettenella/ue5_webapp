import * as React from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor, ue_template } from '../../declarations/ue_template';
import { ActorSubclass } from '@dfinity/agent';
import { _SERVICE } from '../../declarations/ue_template/ue_template.did';
import { SendToUE } from './peer-stream';
import Navbar from './components/Navbar';
import PolicyModal from './components/PolicyModal';
// import logo from './logo.png';

export const AppContext = React.createContext<{
	authClient?: AuthClient;
	setIsAuthenticated?: React.Dispatch<boolean>;
	actor?: ActorSubclass<_SERVICE> | undefined;        
}>({});

//Handle Received Messages from Unreal
export async function ReceivedFromUnreal(detail : string){
	let option = detail.split("@")[0]
	let message = detail.split("@")[1]
	let colorBtn = document.getElementById("change_color_btn") as HTMLElement;
	
	switch (option) {
			case "canister_call" : {
					console.log("canister_call:  " + message);
					//Call main.mo function: "greet"
					SendToUE("can_response@" + await ue_template.greet(message));                    
					break;
			}

			case "updateColor" : {
					console.log("updateColor: " + message);  
					colorBtn.className="";
					colorBtn.classList.add(message);                   
					break;
			}

		default: console.log("unknown message");
	}
}

const App = () => {
	const [authClient, setAuthClient] = React.useState<AuthClient | undefined>(undefined);
	const [actor, setActor] = React.useState<ActorSubclass<_SERVICE> | undefined>(undefined);        
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);    
	const [modalOpen, setModalOpen] = React.useState(false);  
					
	let colorIndex = 0;
	function RandomColor(){
			let color = ["red", "green", "blue", "orange"];
			colorIndex == 3 ? colorIndex = 0 : ++colorIndex;
			console.log(colorIndex);
			return color[colorIndex];
	}

	//Internet-Identity Login
	React.useEffect(()=>{
		AuthClient.create().then(async (client)=>{
			setAuthClient(client);
			setIsAuthenticated(await client.isAuthenticated());                
		});
	}, []);

	React.useEffect(()=>{
		if(!authClient) return;

		const identity = authClient.getIdentity();
		const actor = createActor(canisterId as string, {
				agentOptions: {
						identity
				}
		});
		setActor(actor);
	}, [isAuthenticated]);



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
			<PolicyModal modalOpen={modalOpen} setModalOpen={setModalOpen} authenticate={authenticate}/>
			{ isAuthenticated && 
			<div>
				<script src="peer-stream.js"></script>
				<video is="peer-stream" ref={elm => elm && elm.setAttribute('signal', 'ws://localhost:88')} >
						<track default kind="captions" srcLang="en" />
				</video>

				<button onClick={async(e) => {
          let button = e.currentTarget.classList;
          button.add("disabled");
          SendToUE("direct_response@call");                        
          SendToUE("can_response@" + await ue_template.greet("Unreal Player!"));
          button.remove("disabled");                        
				}}>Canister Call</button>

        <button id="change_color_btn" onClick={(e) => {
          let color = RandomColor();
          SendToUE("direct_response@" + color);
          e.currentTarget.className = "";
          e.currentTarget.classList.add(color);                    
        }}>Change Color</button>
			</div>
			}
		</>
		// <AppContext.Provider value={{ authClient, setIsAuthenticated, actor }}>
		// 	<main>
		// 		{!isAuthenticated ? (
		// 				<section>                        
		// 						<button onClick={() => {authenticate}} >
		// 								<a>Log in</a>
		// 						</button> 
		// 				</section>
		// 		) : (
		// 				<div>
		// 				<script src="peer-stream.js"></script>
		// 				<video is="peer-stream" ref={elm => elm && elm.setAttribute('signal', 'ws://localhost:88')} >
		// 						<track default kind="captions" srcLang="en" />
		// 				</video>
						
		// 				<div>Authenticated</div>

						// <button onClick={async(e) => {
						// 		let button = e.currentTarget.classList;
						// 		button.add("disabled");
						// 		SendToUE("direct_response@call");                        
						// 		SendToUE("can_response@" + await ue_template.greet("Unreal Player"));
						// 		button.remove("disabled");                        
						// 		}}>Canister Call</button>

						// <button id="change_color_btn" onClick={(e) => {
						// 		let color = RandomColor();
						// 		SendToUE("direct_response@" + color);
						// 		e.currentTarget.className = "";
						// 		e.currentTarget.classList.add(color);                    
						// }
						
						// }>Change Color</button>
						// <button onClick={async() =>{
						// 		await authClient?.logout()
						// 		setIsAuthenticated?.(false)
						// }}>Log out
						// </button>
		// 				</div>
		// 		)}    
		// 	</main>
		// </AppContext.Provider>
	);
};






export default App;