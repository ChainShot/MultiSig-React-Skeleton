import React , {Component} from 'react';
import deploy from '../contract/deploy';
import web3 from '../contract/web3Config';

class AddWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owner: '',
            required: 0,
            transactions: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {owner, required} = this.state;
        const {addWallet} = this.props;
        let account = web3 && web3.eth.accounts[0];
        if (account) {
            let owners = [owner, account];
            deploy(owners, required, account, (err, tx) => {
                if (!err) {
                    addWallet(tx);
                }
            });
        }
    }

    handleChange(prop) {
        return ({target}) => this.setState({[prop]: target.value});
    }

    render() {
        const {owner, required} = this.state;
        return(
            <form className='form' onSubmit={this.handleSubmit}>
              <div className="form-group address">
                <label>Additional Owner</label>
                <input type="text"
                    className="form-control"
                    placeholder="Enter owner address"
                    onChange={this.handleChange('owner')}
                    value={owner}/>
              </div>
              <div className="form-group">
                <label>Required Confirmations</label>
                <input type="number"
                    className="form-control"
                    onChange={this.handleChange('required')}
                    value={required}/>
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default AddWallet;
