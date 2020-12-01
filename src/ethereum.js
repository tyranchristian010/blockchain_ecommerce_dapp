//this file configures the connection to the blockchain. so we import ethers.js and the contract object of ethers
import { ethers, Contract } from 'ethers';
import PaymentProcessor from './abis/PaymentProcessor.json';
import Dai from './abis/Dai.json';

const getBlockchain = () =>                         //getBlockchain creates our connection to ethereum and returns a Promise
  new Promise((resolve, reject) => {                 //A promise is an object to deal with asynchronous code. when we call resolve the promise is finished
    window.addEventListener('load', async () => {        //So we wait for everything to be loaded in the browser. which fires and event called load
      if(window.ethereum) {                                  //if metamask is present we will call .enable to show a pop up to the user asking them permission to grant metamask access to the app
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);  //we creat a provider with ethers which is basically a connector to the blockchain
        const signer = provider.getSigner();                             //with this we are able to send tx.
        const signerAddress = await signer.getAddress();

 //now we instantiate an object to interact with our smart contracts.
        const paymentProcessor = new Contract(
          PaymentProcessor.networks[window.ethereum.networkVersion].address,
          PaymentProcessor.abi,
          signer
        );

        const dai = new Contract(
          Dai.networks[window.ethereum.networkVersion].address, //for mainnet and public testnet replace by address of already deployed dai token
          Dai.abi,
          signer
        );

        resolve({provider, paymentProcessor, dai});                //when we call resolve the promise is finished we got what we wanted and we return 
                                                                //the provider, paymentProcessor and dai objects.
                                                                //and if we dont have metamask installed we return undefined for everything.   
      }
      resolve({provider: undefined, paymentProcessor: undefined, dai: undefined});
    });
  });

export default getBlockchain;