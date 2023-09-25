export const convertChainIdNumberToHex = (chainId: number) => {
    return `0x${Number(chainId).toString(16)}`;
};

export const formatOrderlySecretKey = (secretKey: string) => {
    return `ed25519:${secretKey}`;
};

export const getObjectValue = (obj: any, path: any) => {
    // same as lodash _.get
    // path like 'a.b.c' or 'a[0].b.c'
    if (!obj || !path) {
        return;
    }
    const paths = path.split(/[.[\]]/).filter((p: any) => p);
    let result = obj;
    for (let i = 0; i < paths.length; i++) {
        const p = paths[i];
        result = result[p];
        if (result === undefined) {
            return;
        }
    }
    return result;
};
