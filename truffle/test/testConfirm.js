const MultiSig = artifacts.require('MultiSig');
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    let _beneficiary = accounts[1];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let _required = 2;
    beforeEach(async () => {
        contract = await MultiSig.new(_owners, _required);
    });

    describe('Confirm Transaction Tests', function() {
        it('should get an array of owners', async function() {
            let owners = await contract.getOwners();

            assert.equal(_owners.length, owners.length)
        })

        it('should confirm the transaction', async function() {
            await contract.addTransaction(_beneficiary, 100, [], {
                from: _creator
            })
            await contract.confirmTransaction(0, {from: _creator});
            let confirmed = await contract.getConfirmations.call(0)
            assert.equal(confirmed[0], _creator);
        })

        it('should return an array of size equal to the amount of confirmations', async function() {
            await contract.addTransaction(_beneficiary, 100, [], {
                from: _creator
            })
            await contract.confirmTransaction(0, {from: _creator});
            let confirmed = await contract.getConfirmations.call(0)

            assert.equal(confirmed.length, 1);
        })
    });
});
