import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {SwapTokenInfoInterface} from "../interfaces/common.interface";
import {useWalletConnect} from "../WalletConnectContext";
import {approveERC20Token, crossChainSwapDeposit} from "../services/contract.service";
import {ReactNode, useEffect, useState} from "react";
import {ethers} from "ethers";
import ERC20Abi from '../utils/erc20Abi.json';
import {environment} from "../enviroments/environment";

interface IProps {
    tokenList: SwapTokenInfoInterface[];
    networkId: string | null;
}

export default function TokenList({tokenList, networkId}: IProps) {
    const {userAddress, web3} = useWalletConnect();
    const [balanceObj, setBalanceObj] = useState<{[key: string]: string}>({});
    const [approvedAmountObj, setApprovedAmountObj] = useState<{[key: string]: string}>({});
    useEffect(() => {
        if (!web3) {
           return;
        }


        getTokenAmount().then(res => {
            console.log('balance', res);
            const obj: {[key: string]: string} = res?.reduce((acc, curr) => {
               acc[curr.address] = curr.balance;
               return acc;
            }, {});
            setBalanceObj(obj);
        });

        getApprovedAmount().then(res => {
            console.log('approve ', res);
            const obj: {[key: string]: string} = res?.reduce((acc, curr) => {
                acc[curr.address] = curr.amount;
                return acc;
            }, {});
            setApprovedAmountObj(obj);
        })


    }, [web3]);

    const getApprovedAmount = async () => {
        if (!web3) {
            return;
        }
        const approvedSourceList: any[] = [];
       for (const item of tokenList) {
           if (item.address.indexOf('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') !== -1) {
               continue;

           }
           const contract = new web3.eth.Contract(ERC20Abi,item.address);

           // @ts-ignore
           approvedSourceList.push(contract.methods.allowance(userAddress, environment.config.crossChainRouteAddress).call().then(res => ({
               address: item.address,
               origin: res,
               // @ts-ignore
               amount: ethers.formatUnits(res, item.decimals),
           })))
       }

       return Promise.all(approvedSourceList);

    };

    const approve = async (tokenInfo: SwapTokenInfoInterface) => {
        if (!web3 || !userAddress) {
            return;
        }

        const res = await approveERC20Token(userAddress, web3, tokenInfo.address)
        console.log('approve, res', res);


    };


    const getTokenAmount = async () => {
        if (!web3 || !userAddress) {
            return;
        }
        const balanceSourceList: any[] = [];
        for (const item of tokenList) {
            if (item.address.indexOf('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') !== -1) {
                balanceSourceList.push(web3.eth.getBalance(userAddress, 'latest').then(res => ({
                    address: item.address,
                    origin: res,
                    balance: ethers.formatUnits(res, item.decimals),
                })));
                continue;
            }
            const contract = new web3.eth.Contract(ERC20Abi,item.address);
            // @ts-ignore
            balanceSourceList.push(contract.methods.balanceOf(userAddress).call().then(res => ({
                address: item.address,
                origin: res,
                // @ts-ignore
                balance: ethers.formatUnits(res, item.decimals),
            })));
        }
        return Promise.all(balanceSourceList);
    }
    const swapDeposit = (tokenInfo: SwapTokenInfoInterface) => {
        if (!userAddress || !web3) {
            return;
        }
        crossChainSwapDeposit({
            web3,
            userAddress,
            srcBridgeAmount: '0.2',
            slippage: '1.5',
            src: {
                network: 'base',
                token: tokenInfo.address,
                decimal: tokenInfo.decimals.toString(),
            },
            dst: {
                network: 'arbitrum',
                token: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
            }
        }).then();

    };
    const renderTableBody = () => {
        const rows: ReactNode[] = [];

        tokenList.map(tokenInfo =>
            rows.push(
                <TableRow key={tokenInfo.address}>
                    <TableCell>
                        {tokenInfo.symbol}
                        <br/>
                        {tokenInfo.address}

                    </TableCell>
                    <TableCell>
                        {(balanceObj && balanceObj[tokenInfo.address]) || '-'}
                    </TableCell>
                    <TableCell>
                        {(approvedAmountObj && approvedAmountObj[tokenInfo.address]) || '-'}
                        <br/>
                        <button onClick={() => approve(tokenInfo)}>Approve</button>
                    </TableCell>
                    <TableCell>
                        <button onClick={() => swapDeposit(tokenInfo)}>Swap Deposit</button>
                    </TableCell>
                </TableRow>
            )
        )
        return rows;
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        }}>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Token/ token address
                        </TableCell>

                        <TableCell>
                            Amount
                        </TableCell>
                        <TableCell>
                            Approved Amount
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTableBody()}

                </TableBody>

            </Table>

        </Box>
    )
}