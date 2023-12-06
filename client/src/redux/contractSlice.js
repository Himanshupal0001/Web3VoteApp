import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    provider: null,
    signer: null,
    contract: null,
    isAdmin: false
}

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setContract: (state, action) => {
            console.log(action.payload)
            state.provider = action.payload.provider;
            state.contract = action.payload.contract;
            state.signer = action.payload.signer;
            state.isAdmin = action.payload.isAdmin;
        }
    }
})

export const { setContract } = contractSlice.actions;
export default contractSlice.reducer;