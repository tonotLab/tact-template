import { Address, OpenedContract, toNano } from '@ton/core';
import { Mint, SimpleTactJetton } from '../wrappers/SimpleTactJetton';
import { compile, NetworkProvider } from '@ton/blueprint';
import { JettonDefaultWallet } from '../build/SimpleTactJetton/tact_JettonDefaultWallet';

//
const jettonTokenAddress = Address.parse('EQAGdGX1PfjTYfZasNNjoyTidkqRlbdQ6ZIikZiUg8RjDiqB');
const userAddress = Address.parse('EQBKzR0_xH-NX5a_s9nze06GUte6rCOaZABOiC8E6OAnpbU5');

export async function run(provider: NetworkProvider) {
    // token owner
    const simpleTactJetton = provider.open(SimpleTactJetton.fromAddress(jettonTokenAddress));
    const owner = await simpleTactJetton.getOwner();
    console.log(`owner:${owner}`);

    //total supply
    const supplyBefore = (await simpleTactJetton.getGetJettonData()).total_supply;
    console.log(`totalSupply:${supplyBefore}`);

    //query balance
    const userWalletContarctAddress = await simpleTactJetton.getGetWalletAddress(userAddress);
    const userWalletContract = provider.open(JettonDefaultWallet.fromAddress(userWalletContarctAddress));
    const userWalletData = await userWalletContract.getGetWalletData();
    console.log(`user:${userWalletData.owner} userBalance:${userWalletData.balance}`);
}
