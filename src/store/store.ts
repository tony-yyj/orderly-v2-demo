import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import woofiSwapSlice from "../slices/woofi-swap.slice";
import {RootState} from "./types";
import assetSlice from "../slices/asset.slice";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default configureStore({
    reducer: {
        woofiSwap: woofiSwapSlice,
        asset: assetSlice,
    },
})