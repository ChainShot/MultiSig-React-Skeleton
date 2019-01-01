import React, {Component} from 'react';
import {getWallet} from '../contract/interface';
import web3 from '../contract/web3Config';

class LoadWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wallet: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {addWallet} = this.props;
        const {wallet} = this.state;
        let account = web3 && web3.eth.accounts[0];
        if (account) {
            addWallet(getWallet(wallet));
        }
    }

    handleChange(prop) {
        return ({target}) => this.setState({[prop]: target.value});
    }

    render() {
        const {wallet} = this.state;
        return(
            <form className='form' onSubmit={this.handleSubmit}>
              <div className="form-group address">
                <label>Load Wallet</label>
                <input type="text"
                    className="form-control"
                    placeholder="Enter wallet address"
                    onChange={this.handleChange('wallet')}
                    value={wallet}/>
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default LoadWallet;
