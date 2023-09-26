import RequestUtil from "../utils/request.util";
import {lastValueFrom, map} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {lineToHumpTransfer} from "../formatters/code.formatter";
import store from "../store/store";
import {setTokenList} from "../slices/asset.slice";

export const getTokenList = () => {
    const url = '/v1/public/token';
    return fromPromise(RequestUtil.get(url, null, null)).pipe(
        map(res => {
            res.data.rows = res.data.rows?.map(lineToHumpTransfer);
            store.dispatch(setTokenList(res.data.rows));

         return res;
        })
    );

}