import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from 'web3';
import { connectors } from '../lib/connectors';

let web3
let address

const useConnectWallet = () => {
  const [account, setAccount] = useState()
  const [loading, setLoading] = useState(true)
  const [hasProvider, setHasProvider] = useState(false);
  const [provider, setProvider] = useState(null);
  const { activate, deactivate } = useWeb3React();

  const connectWalletHandler = () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      setHasProvider(true);
    } else {
      console.log('Need to install MetaMask');  
      setHasProvider(false)
    }

    setTimeout(function () {
      setLoading(false)
    }, 500)
  }

  const handleAccountChanged = async (type) => {
    await activate(connectors[type])

    if (localStorage.getItem('provider') !== null) {
      const account1 = await web3.eth.getAccounts();

      if (type === localStorage.getItem('provider')) {
        if (account1.length) {
          address = localStorage.setItem("address", account1[0])
          localStorage.setItem('provider', type)
          setAccount(account1[0])
          setProvider(type)
        } else {
          disconnect()
        }
      }
    }
  }

  async function connect(type) {
    setLoading(true);

    try {
      handleAccountChanged(type)
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
      localStorage.removeItem("address")
    } catch (error) {
      console.log(error)
    }
  }

  const connectOnload = async (type) => {
    await activate(connectors[type])
    const account1 = await web3.eth.getAccounts();

    if (account1.length) {
      address = localStorage.setItem("address", account1[0])
      localStorage.setItem('provider', type)
      setAccount(account1[0])
    } else {
      disconnect()
    }
  }

  useEffect(() => {
    let isMounted = true
    address = localStorage.getItem('address')
    const cachedProvider = localStorage.getItem('provider')

    if (isMounted) {
      setProvider(cachedProvider)
      if (address !== null && cachedProvider !== null) {
        connectOnload(cachedProvider)
      }

      connectWalletHandler()
    }

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        console.log('accounts changed')
        disconnect()
      });

      window.ethereum.on('chainChanged', () => {
        if (typeof window !== undefined) {
          console.log('chain changed')
          window.location.reload();
        }
      })

      window.ethereum.removeListener('accountsChanged', () => { })
      window.ethereum.removeListener('chainChanged', () => { })
    }
  }, [web3])

  return {
    account,
    setAccount,
    connect,
    disconnect,
    loading,
    setLoading,
    hasProvider,
    provider,
    setProvider
  }
}

export default useConnectWallet;