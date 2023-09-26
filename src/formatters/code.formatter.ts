/*
 *
 * api request params and response use underline format. eg: total_interest
 *
 * client page use hump format eg: totalInterest
 *
 *
 *
 * use humpToLineTransfer before calling Api,
 *
 * use lineToHumpTransfer after calling APi,
 *
 * */
import clone from 'lodash/clone';

export const snakeToCamelCase = (value: string) => {
    return value.replace(/_(\w)/g, (_, word) => word.toUpperCase());
};
export const camelToSnakeCase = (value: string) => {
    return value.replace(/([A-Z])/g, '_$1').toLowerCase();
};


export function formatHumpLineTransfer(params: any, type: 'hump' | 'line') {
    let hump = '';
    const data = clone(params);
    // 转换对象中的每一个键值为驼峰的递归
    const formatTransferKey = (data: any) => {
        if (data instanceof Array) {
            data.forEach((item) => formatTransferKey(item));
        } else if (data instanceof Object) {
            for (const key in data) {
                hump = type === 'hump' ? snakeToCamelCase(key) : camelToSnakeCase(key);
                data[hump] = data[key];
                if (key !== hump) {
                    delete data[key];
                }
                if (data[hump] instanceof Object) {
                    formatTransferKey(data[hump]);
                }
            }
        } else if (typeof data === 'string') {
            data = type === 'hump' ? snakeToCamelCase(data) : camelToSnakeCase(data);
        }
    };
    formatTransferKey(data);
    return data;
}

export function lineToHumpTransfer(data: any) {
    if (!data) {
        return data;
    }
    return formatHumpLineTransfer(data, 'hump');
}

export function humpToLineTransfer(data: any) {
    if (!data) {
        return data;
    }
    return formatHumpLineTransfer(data, 'line');
}
