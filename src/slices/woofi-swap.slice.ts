import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SwapSupportInterface} from "../interfaces/common.interface";


interface WoofiSwapState{
    swapSupport?: SwapSupportInterface;

}

const initState: WoofiSwapState = {};
const woofiSwapSlice = createSlice({
    name: 'woofiSwap',
    initialState: initState,
    reducers: {
        setSwapSupport: (state, action: PayloadAction<SwapSupportInterface>) => {
            return action.payload || {};
        }
    },
})

export const {
    setSwapSupport,
} = woofiSwapSlice.actions;

export default woofiSwapSlice.reducer;