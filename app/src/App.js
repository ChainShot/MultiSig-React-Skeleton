import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AddWallet from './components/AddWallet';
import WalletList from './components/WalletList';
import LoadWallet from './components/LoadWallet';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wallets: [],
        };

        this.addWallet = this.addWallet.bind(this);
    }

    addWallet(wallet) {
        const {wallets} = this.state;
        const {address} = wallet;
        let dupe = false;
        wallets.forEach(wallet => {
            if(wallet === address) dupe = true;
        });
        if(!dupe) {
            this.setState({wallets: this.state.wallets.concat(address)});
        }
    }

  render() {
      const {wallets} = this.state;
    return (
      <div className="App">
          <AddWallet
              addWallet={this.addWallet}/>
          <LoadWallet
              addWallet={this.addWallet}/>
          <WalletList
              wallets={wallets}/>
      </div>
    );
  }
}

export default App;
