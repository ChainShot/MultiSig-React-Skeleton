import React, {Component} from 'react';
import Wallet from './Wallet';

class WalletList extends Component {
    render() {
        const {wallets} = this.props;
        return(
            <div className="wallet-container">
                <label className='title'>Wallets</label>
                <ul className='list-group'>
                    {wallets.map(wallet => {
                        return(
                            <Wallet key={wallet} wallet={wallet}/>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default WalletList;
