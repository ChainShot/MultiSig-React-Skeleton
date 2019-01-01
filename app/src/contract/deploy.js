import web3 from './web3Config';

const {bytecode, abi} = require('./MultiSig.json');
const MultiSig = web3.eth.contract(abi);
const noop = () => {};
const buffer = 2;

function deploy(owners, required, initiatorAddress, callback = noop) {
    const options = {
        data: bytecode,
        from: initiatorAddress,
        // value: web3.toWei(value, 'ether'),
    }
    const contractData = MultiSig.new.getData(owners, required, options);
        MultiSig.new(owners, required, {
            ...options
        }, callback);
}

export default deploy;
