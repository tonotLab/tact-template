import { Address, OpenedContract, toNano } from '@ton/core';
import { Mint, SimpleTactJetton } from '../wrappers/SimpleTactJetton';
import { compile, NetworkProvider } from '@ton/blueprint';

//
const jettonTokenAddress = Address.parse('EQAGdGX1PfjTYfZasNNjoyTidkqRlbdQ6ZIikZiUg8RjDiqB');

export async function run(provider: NetworkProvider) {
    // open Contract instance by address
    const simpleTactJetton = provider.open(SimpleTactJetton.fromAddress(jettonTokenAddress));
    const owner = await simpleTactJetton.getOwner();
    console.log(`owner:${owner}`);

    const supplyBefore = (await simpleTactJetton.getGetJettonData()).total_supply;
    console.log(`supplyBefore:${supplyBefore}`);

    //mint param
    const mintTokenAmount = toNano('18');
    const mintTo = Address.parse('EQB5l3xDhlFh19gJQQQ0md9xBM68RvEfamFupgIjWSIQHuUM');
    const mint: Mint = {
        $$type: 'Mint',
        amount: mintTokenAmount,
        receiver: mintTo,
    };
    //gas seems to return if there's any extra
    await simpleTactJetton.send(provider.sender(), { value: toNano('0.5') }, mint);
}
