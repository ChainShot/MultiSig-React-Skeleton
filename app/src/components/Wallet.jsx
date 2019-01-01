import React, {Component} from 'react';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
        };

        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm() {
        this.setState({showForm: !this.state.showForm});
    }

    render() {
        const {wallet} = this.props;
        const {showForm} = this.state;
        return(
            <li className='list-group-item'>
                <div className='title'>
                    Wallet address:  {wallet}
                </div>
                <div>
                    <button className='btn btn-primary' onClick={this.toggleForm}>Add Transaction</button>
                    <AddTransaction
                        wallet={wallet}
                        showForm={showForm}
                        toggleForm={this.toggleForm}/>
                </div>
                <TransactionList wallet={wallet} />
            </li>
        );
    }
}

export default Wallet;
