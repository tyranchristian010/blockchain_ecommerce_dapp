pragma solidity ^0.6.2;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PaymentProcessor {
    address public admin;                                       //address of the merchant/store owner
    IERC20 public dai;                                          //pointer to the dai smart contract

    event PaymentDone (                                         //at the end of the pay() we want to emit an event so of course we need to define one here.
        address payer,
        uint amount,
        uint paymentId,
        uint date
    );
    constructor(address adminAddress, address daiAddress) public { //the dai address is the same one on mainnet. the reason we make it configurable in the constructor because it allows us to deploy our payment processor on test or mainnet.
        admin=adminAddress;
        dai=IERC20(daiAddress);
    }
    function pay(uint amount, uint paymentId) external {
        dai.transferFrom(msg.sender, admin, amount);                       //transferFrom is delegated transfer which allows us to transfer the token to our contract. transferFrom allows us to transfer tokens from one address to another on behalf of someone else but 1st we must be approved. 
        emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);     // this is the standard way to send tokens to a smart contract. if we were to do a direct transfer using transfer() the smart contract has no way to react to incoming transfer. 
                                                                           //we need to be able to react to event being emit. the tokens sre sent directly to the admin/merchant and are never "inside" our SC.
    }
}
//this concludes our payment processor smart contract. next we need to write one for dai.
//Dai.sol is on mainnet but we need to write our own mock Dai.sol to use on testnet