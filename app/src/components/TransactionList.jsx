import React, {Component} from 'react';
import {getTransactionCount, getTransactionIds} from '../contract/interface';
import Transaction from './Transaction';

class TransactionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
        };
    }
    componentDidMount() {
        const {wallet} = this.props;
        getTransactionCount(wallet, (err, count) => {
            getTransactionIds(wallet, true, true, (err, ids) => {
                this.setState({ids});
            });
        });
    }

    render() {
        const {ids} = this.state;
        const {wallet} = this.props;
        if (!ids) return null;
        return(
            <div className='transaction-container'>
                <label className='title'>Transactions</label>
                <ul className='list-group'>
                    {ids.map(id => {
                        id = id.toNumber();
                        return(
                            <Transaction
                                key={id}
                                id={id}
                                wallet={wallet}/>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default TransactionList;
