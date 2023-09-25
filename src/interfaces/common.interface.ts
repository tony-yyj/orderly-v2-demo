
export interface SwapNetworkInfoInterface {
    name: string;
    chain_id: number;
    bridge_enable: boolean;
    mainnet: boolean;
    explorer_address_base_url: string;
}

export interface SwapTokenInfoInterface {
    address: string;
    symbol: string;
    decimal: number;
    swap_enable: boolean;
}

export interface SwapSupportTokenInterface {
    dex: string[];
    network_infos: SwapNetworkInfoInterface;
    token_infos: SwapTokenInfoInterface[];
}
export type SwapSupportInterface = { [key: string]: SwapSupportTokenInterface };

export interface SwapSupportObservableInterface {
    status: string;
    data: SwapSupportInterface;
}