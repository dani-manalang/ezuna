import detectEthereumProvider from "@metamask/detect-provider";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Web3 from 'web3';
import { connectors } from '../lib/connectors';

let web3
let address

const useConnectWallet = () => {
  const [account, setAccount] = useState()
  const [loading, setLoading] = useState(true)
  const { activate, deactivate, connector } = useWeb3React();
  const provider = detectEthereumProvider();

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      web3 = new Web3(window.ethereum);
    } else {
      web3 = new Web3(window.web3.currentProvider)
      console.log('Need to install MetaMask');  
    }

    setTimeout(function () {
      setLoading(false)
    }, 500)
  }

  async function connectOnLoad() {
    try {
      await activate(connectors.injected)

      const account1 = await web3.eth.getAccounts();

      if (account1.length) {
        address = localStorage.setItem("address", account1[0]);
        setAccount(account1[0])
      } else {
        disconnect()
      }
    } catch (error) {
      console.log(error)
    }

    setTimeout(function () {
      setLoading(false)
    }, 500)
  }

  async function connect() {
    setLoading(true);

    try {
      await activate(connectors.injected)
      const account1 = await web3.eth.getAccounts();

      if (account1.length) {
        address = localStorage.setItem("address", account1[0]);
        setAccount(account1[0])
      } else {
        disconnect()
      }
    } catch (error) {
      console.log(error)
    }

    setTimeout(function () {
      setLoading(false)
    }, 500);
  }

  async function disconnect() {
    try {
      setAccount(null)
      deactivate()
      localStorage.removeItem("address");
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isMounted = true
    address = localStorage.getItem('address')

    if (isMounted) {
      if (address !== null) {
        connectOnLoad()
      }

      connectWalletHandler()
    }

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (provider) {
      ethereum.on('accountsChanged', () => {
        disconnect()
      });

      ethereum.on('chainChanged', () => {
        if (typeof window !== undefined) {
          window.location.reload();
        }
      })

      ethereum.removeListener('accountsChanged', () => { })
      ethereum.removeListener('chainChanged', () => { })
    }
  }, [provider])

  return {
    account,
    setAccount,
    connect,
    disconnect,
    loading,
    setLoading
  }
}

export default useConnectWallet;