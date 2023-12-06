import { createContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [contractState, setContractState] = useState({
        provider:null,
        signer:null,
        contract:null
    })

    return(
        <AuthContext.Provider value={{contractState, setContractState}}>
            {children}
        </AuthContext.Provider>
    )
}