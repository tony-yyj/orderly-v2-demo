import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {SwapTokenInfoInterface} from "../interfaces/common.interface";
import {useWalletConnect} from "../WalletConnectContext";
import {crossChainSwapDeposit} from "../services/contract.service";
import {ReactNode, useEffect, useState} from "react";
import {ethers} from "ethers";
import ERC20Abi from '../utils/erc20Abi.json';

interface IProps {
    tokenList: SwapTokenInfoInterface[];
    networkId: string | null;
}

export default function TokenList({tokenList, networkId}: IProps) {
    const {userAddress, web3} = useWalletConnect();
    const [balanceObj, setBalanceObj] = useState<{[key: string]: string}>({});
    useEffect(() => {
        if (!web3) {
           return;
        }
        const balanceSourceList = [];
        for (const item of tokenList) {
            balanceSourceList.push(web3.eth.getBalance(item.address, 'latest').then(res => (
                {
                    address: item.address,
                    origin: res,
                   balance: ethers.formatUnits(res, item.decimals),
                }
            )));
        }
        Promise.all(balanceSourceList).then(res => {
            console.log('origin', res);
            const obj: {[key: string]: string} = {};
            res.forEach(item => {
                obj[item.address] = item.balance;
            })
            setBalanceObj(obj);
        });

        getTokenAmount().then();


    }, [web3]);


    const getTokenAmount = async () => {
        if (!web3 || !userAddress) {
            return;
        }
        for (const item of tokenList) {
            if (item.address.indexOf('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') !== -1) {
                continue;
            }
            const contract = new web3.eth.Contract(ERC20Abi,item.address);
            console.log('ttt', userAddress, item.address);
            // @ts-ignore
            const receipt = await contract.methods.balanceOf(userAddress).call();
            // @ts-ignore
            console.log('token', item.symbol, ethers.formatUnits(receipt, item.decimals),);
        }
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
                    </TableCell>
                    <TableCell>
                        {tokenInfo.address}
                    </TableCell>
                    <TableCell>
                        {(balanceObj && balanceObj[tokenInfo.address]) || '-'}
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
                            Token
                        </TableCell>

                        <TableCell>
                            Token Address
                        </TableCell>
                        <TableCell>
                            Amount
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