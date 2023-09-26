import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TokenInterface} from "../interfaces/asset.interface";

interface AssetState{
    tokenList?: TokenInterface[];
}

const initialState: AssetState = {
    tokenList: [],
}

const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        setTokenList: (state, action: PayloadAction<TokenInterface[]>) => {
           state.tokenList = action.payload || [];
        }

    }
});

export const {
    setTokenList,

} = assetSlice.actions;

export default assetSlice.reducer;