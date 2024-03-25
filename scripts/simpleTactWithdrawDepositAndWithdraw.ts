import { Address, OpenedContract, toNano } from '@ton/core';
import { SimpleTactIdo, Withdraw } from '../wrappers/SimpleTactIdo';
import { compile, NetworkProvider } from '@ton/blueprint';

const jettonTokenAddress = Address.parse('EQCFnkieTUBWTSqBzCK24t-k7mdE9-7W8TTxyz3_ohGzykpF');

export async function run(provider: NetworkProvider) {
    // open Contract instance by address
    const simpleTactIdo = provider.open(SimpleTactIdo.fromAddress(jettonTokenAddress));


    //deposit
    // await simpleTactIdo.send(provider.sender(), { value: toNano('0.05') }, null);
    //withdraw
    await simpleTactIdo.send(provider.sender(), { value: toNano('0.02') }, "withdraw all");
}
