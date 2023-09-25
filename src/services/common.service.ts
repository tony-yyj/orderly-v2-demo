import {SwapSupportInterface, SwapSupportObservableInterface} from "../interfaces/common.interface";
import {from, map, Observable} from "rxjs";
import {environment} from "../enviroments/environment";
import store from "../store/store";
import {setSwapSupport} from "../slices/woofi-swap.slice";

export const WooFiSwapSupport = (): Observable<SwapSupportObservableInterface> => {
    return from(
        new Promise((resolve, reject) => {
            fetch(`${environment.config.swapSupportApiUrl}/swap_support`).then((res) => {
                resolve(res.json());
            });
        }),
    ).pipe(
        map((res: any) => {
            console.log('swap support', res);
            if (res && res.status === 'ok') {
                const data = res.data as SwapSupportInterface;
                store.dispatch(setSwapSupport(data));
            }
            return res;
        }),
    );
};