import {configureStore} from "@reduxjs/toolkit";
import woofiSwapSlice from "../slices/woofi-swap.slice";

export default configureStore({
    reducer: {
        woofiSwap: woofiSwapSlice,
    },
})