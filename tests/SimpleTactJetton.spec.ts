// import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
// import { toNano } from '@ton/core';
// import { SimpleTactJetton } from '../wrappers/SimpleTactJetton';
// import '@ton/test-utils';

// describe('SimpleTactJetton', () => {
//     let blockchain: Blockchain;
//     let deployer: SandboxContract<TreasuryContract>;
//     let simpleTactJetton: SandboxContract<SimpleTactJetton>;

//     beforeEach(async () => {
//         blockchain = await Blockchain.create();

//         simpleTactJetton = blockchain.openContract(await SimpleTactJetton.fromInit());

//         deployer = await blockchain.treasury('deployer');

//         const deployResult = await simpleTactJetton.send(
//             deployer.getSender(),
//             {
//                 value: toNano('0.05'),
//             },
//             {
//                 $$type: 'Deploy',
//                 queryId: 0n,
//             }
//         );

//         expect(deployResult.transactions).toHaveTransaction({
//             from: deployer.address,
//             to: simpleTactJetton.address,
//             deploy: true,
//             success: true,
//         });
//     });

//     it('should deploy', async () => {
//         // the check is done inside beforeEach
//         // blockchain and simpleTactJetton are ready to use
//     });
// });
