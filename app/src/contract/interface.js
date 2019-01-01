import web3 from './web3Config';
const { abi } = require('./MultiSig.json');
const MultiSig = web3.eth.contract(abi);
const noop = () => {};

// Use Web3 pre 1.0 to interact with metamask *sobbing*

export const confirmTransaction = (multiSigAddress, transactionId, confirmerAddress, callback = noop) => {
    const instance = MultiSig.at(multiSigAddress);
    instance.confirmTransaction(transactionId, {from: confirmerAddress}, callback);
};

export const getWallet = (multiSigAddress) => {
    return(
        MultiSig.at(multiSigAddress)
    );
};

export const getTransactionCount = (multiSigAddress, callback) => {
    const instance = MultiSig.at(multiSigAddress);
    instance.transactionCount(callback);
};

export const getTransaction = (multiSigAddress, id, callback) => {
    const instance = MultiSig.at(multiSigAddress);
    instance.transactions.call(id, callback);
};

export const getTransactionIds = (multiSigAddress, pending, executed, callback) => {
    const instance = MultiSig.at(multiSigAddress);
    return(
        instance.getTransactionIds(pending, executed, callback)
    )
};

export const submitTransaction = (multiSigAddress, account, destinationAddress, value, data, callback) => {
    const instance = MultiSig.at(multiSigAddress);
    instance.submitTransaction(destinationAddress, value, 0, {
        from: account
    }, callback);
};

// export const transfer = (multiSigAddress, to, value, callback) => {
//     const instance = MultiSig.at(multiSigAddress);
//     callback(instance.transfer.getData(to, web3.toWei(value, 'ether')));
// };

export const getOwners = (multiSigAddress, callback) => {
    const instance = MultiSig.at(multiSigAddress);
    instance.getOwners.call(callback);
};
