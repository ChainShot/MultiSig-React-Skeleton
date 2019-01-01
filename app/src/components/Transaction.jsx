import React, {Component} from 'react';
import {getTransaction, getOwners, confirmTransaction} from '../contract/interface';
import web3 from '../contract/web3Config';

class Transaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transaction: {},
            owners: {}
        };

        this.confirmTransaction = this.confirmTransaction.bind(this);
        this.checkExecuted = this.checkExecuted.bind(this);
    }
    componentDidMount() {
        const {id, wallet} = this.props;
        let account = web3 && web3.eth.accounts[0];
        getTransaction(wallet, id, (err, transaction) => {
            this.setState({transaction: transaction});
        });

        getOwners(wallet, (err, owners) => {
            this.setState({owners: owners});
        });
    }

    confirmTransaction(e) {
        e.preventDefault();
        const {owners} = this.state;
        const {wallet, id} = this.props;
        let validOwner = false;
        let account = web3 && web3.eth.accounts[0];
        owners.forEach(owner => {
            if(owner === account) validOwner = true;
        });
        if (account && validOwner) {
            confirmTransaction(wallet, id, account);
        }
    }

    checkExecuted(executed) {
        if(executed) {
            return(
                <p>Transaction Complete</p>
            );
        } else {
            return(
                <button
                    className='btn btn-primary'
                    onClick={this.confirmTransaction}>
                    Confirm
                </button>
            );
        }
    }

    render() {
        const {transaction} = this.state;
        if (Object.keys(transaction).length === 0 && transaction.constructor === Object) return null;
        const ether = web3.fromWei(transaction[1].toPrecision(), 'ether');
        return(
            <div className='transaction'>
                <ul className='list-group transactions'>
                    <li className='list-group-item'>To Address: {transaction[0]}</li>
                    <li className='list-group-item'>Ether:  {ether}</li>
                    <li className='list-group-item'>executed: {`${transaction[2]}`}</li>
                    <li className='list-group-item'>
                        {this.checkExecuted(transaction[2])}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Transaction;
