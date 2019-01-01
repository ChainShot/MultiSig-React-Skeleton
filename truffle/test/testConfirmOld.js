const MultiSig = artifacts.require('MultiSig');
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    let _theif = accounts[5];
    let _beneficiary = accounts[6];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let _required = 2;
    before(async () => {
        contract = await MultiSig.new(_owners, _required);
    });

    describe('Confirm Transaction Tests', function() {
        it('should confirm a transaction')
        // it('should confirm transaction at transaction creation', async function() {
        //     await contract.submitTransaction(_beneficiary, 20, [], {
        //         from: _creator,
        //     });
        //     await contract.submitTransaction(_beneficiary, 20, [], {
        //         from: accounts[1],
        //     })
        //     let txs = await contract.getTransactionIds(0, 2, true, false);
        //     let txOne = await contract.getConfirmations(txs[0]);
        //     let txTwo = await contract.getConfirmations(txs[1]);
        //     assert.equal(accounts[0], txOne[0])
        //     assert.equal(accounts[1], txTwo[0])
        // });
        //
        // it('should allow confirmation after the initial confirmation', async function() {
        //     await contract.submitTransaction(_beneficiary, 20, [], {
        //         from: _creator,
        //     });
        //
        //     let tx = await contract.getTransactionIds(0, 1, true, false);
        //     await contract.confirmTransaction(tx[0], {
        //         from: accounts[1]
        //     });
        //     let txConfirms = await contract.getConfirmations(tx[0]);
        //     assert.equal(txConfirms.length, 2);
        // });
    });
});
