const MultiSig = artifacts.require('MultiSig');
const errors = [
    "Make sure to declare a public uint for the transaction count!",
    "Make sure to declare a public mapping for the transactions!",
    "Make sure to declare a public uint for the confirmations!",
]

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

    describe('Transaction Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
        });

        it('should define the transaction count', async function() {
            assert(contract.transactionCount, errors[0])
        });

        it('should define a transactions mapping', async function() {
            assert(contract.transactions, errors[0])
        });

        it('should define a confirmations mapping', async function() {
            assert(contract.confirmations, errors[0])
        });
    })
});
