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
    beforeEach(async () => {
        contract = await MultiSig.new(_owners, _required);
    });

    describe('isConfirmed Stage Tests', function() {
        it('should return true if confirmed count equals required confirmations', async function() {
            await contract.submitTransaction(_beneficiary, 20, [], {
                from: _creator,
            });

            let tx = await contract.getTransactionIds(0, 1, true, false);
            await contract.confirmTransaction(tx[0], {
                from: accounts[1]
            });
            let txConfirms = await contract.getConfirmations(tx[0]);
            let required = await contract.required();
            assert.equal(txConfirms.length, required);
        })
        it('should return false if confirmed count does not equal required confirmations', async function() {
            await contract.submitTransaction(_beneficiary, 20, [], {
                from: _creator,
            });

            let tx = await contract.getTransactionIds(0, 1, true, false);
            let required = await contract.required();
            let txConfirms = await contract.getConfirmations(tx[0]);
            assert.notEqual(txConfirms.length, required.toNumber());
        })
    });
});
