import RequestUtil, {handleSignature} from "../utils/request.util";

export const getAccountInfo = async (accountId: string) => {
    const  url = '/usercenter/account';
    const headers = await handleSignature(url, null, accountId);
    return RequestUtil.get(url,headers, null);

}

export const getClientInfo =async (accountId: string) => {
    const  url = '/v1/client/info';
    const headers = await handleSignature(url, null, accountId);
    console.log(JSON.stringify(headers));
    return RequestUtil.get(url,headers, null);

}
