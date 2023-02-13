import { ActorSubclass } from "@dfinity/agent"
import { AuthClient } from "@dfinity/auth-client"
import { Principal } from "@dfinity/principal"
import { canisterId, createActor } from "../../../declarations/ue_template"
import { _SERVICE } from "../../../declarations/ue_template/ue_template.did"

class Auth {
  client: AuthClient|undefined = undefined
  isAuthenticated: boolean = false
  principal: Principal|undefined = undefined
  actor: ActorSubclass<_SERVICE>|undefined = undefined

  constructor() {
    this.init()
  }

  init() {
    AuthClient.create().then(async (client)=>{
			this.client = client  
			const identity = client.getIdentity()
      this.isAuthenticated = await client.isAuthenticated()
      console.log("authentication: " + this.isAuthenticated)
      this.principal = client.getIdentity().getPrincipal()
      this.actor = createActor(canisterId as string, {
        agentOptions: {
            identity
        }
      })
		})
  }

  getPrincipal() {}
}

export default Auth