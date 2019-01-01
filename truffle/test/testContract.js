const MultiSig = artifacts.require('MultiSig');
const errors = [
    "Make sure to declare a public array of owner addresses in your contract!",
    "The arbiter address wasn't set to the expected value. It is the first argument passed into the constructor",
    "Make sure to declare a public uint of required tranasaction confirmations in your contract!",
    "The depositor address wasn't set to the expected value. This should be set as the address calling the constructor",
    "Make sure to declare a public mapping of validOwner addresses in your contract!",
    "The beneficary address wasn't set to the expected value. It is the second argument passed into the constructor",
]
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let _required = 2;

    describe('Contructor Stage Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
        });

        it('should set an array of owners', async function() {
            assert(contract.owners, errors[0])
        });

        it('should set required confirmations', async function() {
            assert(contract.required, errors[2])
        });

        it('should store validOwners', async function() {
            assert(contract.validOwners, errors[2])
        });
    });
});
