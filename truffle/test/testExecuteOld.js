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
    // need to add a deposit function
    describe('Execute Transaction Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
            await contract.sendTransaction({from: accounts[0], value: web3.toWei(20, 'ether')});
        });
        it('should reduce wallet balance, if confirmed', async function() {
            const balanceBefore = await web3.fromWei(web3.eth.getBalance(contract.address).toNumber(), 'ether');
            const value = 20;
            const difference = balanceBefore - value;
            const transferEncoded = contract.contract.transfer.getData(_beneficiary, web3.toWei(value, 'ether'));
            await contract.submitTransaction(_beneficiary, web3.toWei(value, 'ether'), transferEncoded, {
                from: _creator,
            });
            let tx = await contract.getTransactionIds(0, 1, true, false);
            await contract.confirmTransaction(tx[0], {
                from: accounts[1]
            });
            const balance = await web3.fromWei(web3.eth.getBalance(contract.address).toNumber(), 'ether');
            assert.equal(balance, difference);
        });

        it('should increase beneficiary balance, if confirmed', async function() {
            const balanceBefore = await parseFloat(web3.fromWei(web3.eth.getBalance(accounts[1]).toNumber(), 'ether'));
            const value = 20.0;
            const difference = (balanceBefore + value);
            const transferEncoded = contract.contract.transfer.getData(accounts[1], web3.toWei(value, 'ether'));
            await contract.submitTransaction(accounts[1], web3.toWei(value, 'ether'), transferEncoded, {
                from: _creator,
            });
            let tx = await contract.getTransactionIds(0, 1, true, false);
            await contract.confirmTransaction(tx[0], {
                from: accounts[2]
            });
            const balance = await parseFloat(web3.fromWei(web3.eth.getBalance(accounts[1]).toNumber(), 'ether'));
            assert.equal(balance, difference);
        });

        it('should not execute if the transaction is not confirmed', async function() {
            const balanceBefore = await web3.fromWei(web3.eth.getBalance(contract.address).toNumber(), 'ether');
            const value = 20;
            const difference = balanceBefore - value;
            const transferEncoded = contract.contract.transfer.getData(_beneficiary, web3.toWei(value, 'ether'));
            await contract.submitTransaction(_beneficiary, web3.toWei(value, 'ether'), transferEncoded, {
                from: _creator,
            });
            const balance = await web3.fromWei(web3.eth.getBalance(contract.address).toNumber(), 'ether');
            assert.equal(balance, balanceBefore);
        });
    });
});
