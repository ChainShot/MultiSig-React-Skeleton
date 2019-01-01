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

    describe('Initiate a Transaction Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
        });
        it('should create a Transaction struct and log the transaction', async function() {
            let count = 0;
            await contract.submitTransaction(_beneficiary, 20, [], {
                from: accounts[1],
            })
            count += 1;
            await contract.submitTransaction(_beneficiary, 20, [], {
                from: accounts[2],
            })
            count += 1;
            let txs = await contract.getTransactionIds(0, 2, true, false);
            assert.equal(txs.length, count);
        });

        it('should increment the transactionCount variable', async function() {
            await contract.submitTransaction(_beneficiary, 20, [], {
                from: accounts[1],
            })
            await contract.submitTransaction(_beneficiary, 20, [], {
                from: accounts[2],
            })

            let count = await contract.transactionCount.call();
            assert.equal(count, 2);
        });

        it('should set the transactionId equal to the transactionCount', async function() {
            await contract.submitTransaction(_beneficiary, 20, [], {
                from: accounts[1],
            })
            await contract.submitTransaction(_beneficiary, 20, [], {
                from: accounts[2],
            })

            let count = await contract.transactionCount.call();
            let txs = await contract.getTransactionIds(0, 2, true, false);
            assert.equal(count.toNumber() - 1, txs[1].toNumber());
        });
    })
});
