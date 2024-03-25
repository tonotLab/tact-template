import { toNano } from '@ton/core';
import { SimpleTactWithdraw } from '../wrappers/SimpleTactWithdraw';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const simpleTactWithdraw = provider.open(await SimpleTactWithdraw.fromInit());

    await simpleTactWithdraw.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(simpleTactWithdraw.address);

    // run methods on `simpleTactWithdraw`
}
