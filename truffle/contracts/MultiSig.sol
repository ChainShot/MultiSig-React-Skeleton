pragma solidity ^0.4.18;

contract MultiSig {
    address[] public owners;
    uint256 public required;
    uint public transactionCount;
    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;
    mapping(address => bool) public validOwners;

    struct Transaction {
        address destination;
        uint value;
        bool executed;
        bytes data;
    }

    function executeTransaction(uint _transactionId) public {
        require(isConfirmed(_transactionId));
        Transaction storage txn = transactions[_transactionId];
        require(!txn.executed);
        if(txn.destination.call.value(txn.value)(txn.data)) {
            txn.executed = true;
        }
    }

    modifier handleEdge(address[] _owners, uint256 _required) {
        require(_owners.length > 0);
        require(_required > 0);
        require(_owners.length > _required);
        _;
    }

    modifier validOwner(address x) {
        require(validOwners[x]);
        _;
    }

    function MultiSig(address[] _owners, uint256 _required) handleEdge(_owners, _required) public {
        owners = _owners;
        required = _required;
        for(uint i =  0; i < _owners.length; i++) {
            validOwners[_owners[i]] = true;
        }
    }

    function submitTransaction(address destination, uint value, bytes data) public {
        confirmTransaction(addTransaction(destination, value, data));
    }

    function addTransaction(address destination, uint value, bytes data) internal returns(uint) {
        require(destination != address(0));
        transactions[transactionCount] = Transaction(destination, value, false, data);
        transactionCount++;
        return transactionCount - 1;
    }

    function confirmTransaction(uint _transactionId) validOwner(msg.sender) public {
        require(!confirmations[_transactionId][msg.sender]);
        require(transactions[_transactionId].destination != address(0));
        confirmations[_transactionId][msg.sender] = true;
        if(isConfirmed(_transactionId)) {
            executeTransaction(_transactionId);
        }
    }

    function getConfirmations(uint _transactionId) public view returns(address[]) {
        uint count = 0;
        for(uint i = 0; i < owners.length; i++) {
            if(confirmations[_transactionId][owners[i]]) {
                count++;
            }
        }
        address[] memory addresses = new address[](count);
        uint addressCount = 0;
        for(uint j = 0; j < owners.length; j++) {
            if(confirmations[_transactionId][owners[j]]) {
                addresses[addressCount] = owners[j];
                addressCount++;
            }
        }
        return addresses;
    }

    function() payable public {}

    function isConfirmed(uint _transactionId) view public returns(bool) {
        uint count = 0;
        for(uint i = 0; i < owners.length; i++) {
            if(confirmations[_transactionId][owners[i]]) {
                count++;
            }
        }
        return count >= required;
    }

    function getTransactionCount(bool _pending, bool _executed) public view returns (uint) {
        uint count;
        for(uint i = 0; i < transactionCount; i++) {
            if(_pending && !transactions[i].executed) {
                count++;
            }
            else if(_executed && transactions[i].executed) {
                count++;
            }
        }
        return count;
    }

    function getTransactionIds(bool _pending, bool _executed) public view returns (uint[]) {
        uint count;
        for(uint i = 0; i < transactionCount; i++) {
            if(_pending && !transactions[i].executed) {
                count++;
            }
            else if(_executed && transactions[i].executed) {
                count++;
            }
        }
        uint[] memory ids = new uint[](count);
        uint idsCount = 0;
        for(uint j = 0; j < transactionCount; j++) {
            if(_pending && !transactions[j].executed) {
                ids[idsCount] = j;
                idsCount++;
            }
            else if(_executed && transactions[j].executed) {
                ids[idsCount] = j;
                idsCount++;
            }
        }
        return ids;
    }

    function getOwners() public view returns (address[]) {
        address[] memory addresses = new address[](owners.length);
        for(uint i = 0; i < owners.length; i++) {
            addresses[i] = owners[i];
        }
        return addresses;
    }
}
