## Instructions

1) `cd truffle`
2) `truffle compile`
3) `cd ../app`
4) `npm -i`
5) `npm start`
6) `Sign into metamask`

Note: Make sure your truffle version is updated to the most recent version.

## TroubleShooting:

1) If you run into a syntax error referring to your solc version when using `truffle compile`, make sure that your contract uses the `^` when defining the solidity version. `pragma solidity ^0.4.19`

## How to create a wallet:

1) Sign into metamask and make sure to have test ether in your account
2) In the wallets current front-end form, only one additional owner of the wallet can be added. Add the other address which you would like the be the owner. This could just be a second account which you own on the test network.
3) Set the required number of confirmations. Again in its current front-end state, you can only set the max confirmations to 2.
4) Submit the wallet to deploy the MultiSig contract.
5) After the contract is deployed (wait for metamask or check EtherScan), the wallet will populate in the bottom of the app listing the wallet address and giving you the ability to perform transactions.

## How to perform transactions:

1) Load your wallet using contract address if it is not already loaded in at the bottom of the app.
2) Hit the add transaction button where you can specify the address you want to sends Ether to as well as the amount of Ether.
3) Sign the metamask transaction.
4) Once the transaction is confirmed, it should populate below. If it does not load after some time, reload the page, re-enter the wallet address, and you should see the transaction.
5) Depending on the amount of confirmations you required during contract deployment, executed could be true or false. If true, you should see the funds transferred to the beneficiary address you specified. If false, that means additional confirmations are required.
6) For the remaining confirmations, log into that owner metamask account, load the wallet, and you should see a button for signing the transaction. Once the transaction is complete, the funds will transfer to the beneficiary address.

## CHALLENGES:

Try implementing the features below to extend upon your MultiSig wallet.

- add error handling on front end (React)
- allow more than 2 owners of a wallet (React / Web3)
- display progress of transaction. Is it mining? (Solidity / React / Web3)
- display the current confirmation progress of each transaction (Solidity / React / Web3)
- allow rejection of a transaction (Solidity / React / Web3)
- allow Wallets to interact with Tokens (Solidity / React / Web3)
