import React, {Component} from 'react';
import {submitTransaction, transfer} from '../contract/interface';
import web3 from '../contract/web3Config';

class AddTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beneficiary: '',
            value: 0,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {beneficiary, value} = this.state;
        const {wallet, toggleForm} = this.props;
        const weiValue = web3.toWei(value, 'ether');
        let account = web3 && web3.eth.accounts[0];
        if (account) {
            submitTransaction(wallet, account, beneficiary, weiValue, 0, () => {
                toggleForm();
            });
        }
    }

    handleChange(prop) {
        return ({target}) => this.setState({[prop]: target.value});
    }

    render() {
        const {showForm, wallet} = this.props;
        const {beneficiary, value} = this.state;
        if (!showForm) return null;
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Beneficiary Address</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Enter beneficiary address"
                            onChange={this.handleChange('beneficiary')}
                            value={beneficiary}/>
                    </div>
                    <div className="form-group">
                        <label>Ether</label>
                        <input type="number"
                            className="form-control"
                            onChange={this.handleChange('value')}
                            value={value}/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddTransaction;
