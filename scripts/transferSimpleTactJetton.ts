import { Address, OpenedContract, Sender, beginCell, toNano } from '@ton/core';
import { Mint, SimpleTactJetton, TokenTransfer } from '../wrappers/SimpleTactJetton';
import { compile, NetworkProvider } from '@ton/blueprint';
import { JettonDefaultWallet } from '../build/SimpleTactJetton/tact_JettonDefaultWallet';

//
const jettonTokenAddress = Address.parse('EQAGdGX1PfjTYfZasNNjoyTidkqRlbdQ6ZIikZiUg8RjDiqB');

export async function run(provider: NetworkProvider) {
    // open Contract instance by address
    const simpleTactJetton = provider.open(SimpleTactJetton.fromAddress(jettonTokenAddress));

    // Transfer param
    const sender: Sender = provider.sender();
    const senderAddress = sender.address;
    if (!senderAddress) throw new Error('fail sender');
    const transferAmount = toNano(2);
    const transferTo = Address.parse('EQBKzR0_xH-NX5a_s9nze06GUte6rCOaZABOiC8E6OAnpbU5');
    const transferMessage: TokenTransfer = {
        $$type: 'TokenTransfer',
        query_id: 0n,
        amount: transferAmount,
        sender: transferTo,
        response_destination: senderAddress,
        custom_payload: null,
        forward_ton_amount: toNano('0.1'),
        forward_payload: beginCell().storeUint(0, 1).storeUint(0, 32).endCell(),
    };

    //sender wallet contract
    const senderWalletContractAddress = await simpleTactJetton.getGetWalletAddress(sender.address);
    const senderWalletContract = provider.open(JettonDefaultWallet.fromAddress(senderWalletContractAddress));

    //send token
    await senderWalletContract.send(sender, { value: toNano('0.5') }, transferMessage);
}
