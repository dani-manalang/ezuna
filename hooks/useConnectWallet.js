import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from 'web3';
import { connectors } from '../lib/connectors';
import axios from 'axios';
import constants from "../constants";

let web3
let address

const useConnectWallet = () => {
  const [account, setAccount] = useState()
  const [loading, setLoading] = useState(true)
  const [hasProvider, setHasProvider] = useState(false)
  const [provider, setProvider] = useState(null)
  const { activate, deactivate } = useWeb3React()

  const login = (walletAddress) => {
    // fetch tokens
    if (localStorage.getItem('tokens') === null) {
      axios.get(`${constants.origin}/v1/auth/wallet-login?code=${walletAddress}`).then(response => {
        localStorage.setItem('user', JSON.stringify(response?.data?.user))
        localStorage.setItem('tokens', JSON.stringify(response?.data?.tokens))
      })
    }
  }

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
    const cachedProvider = localStorage.getItem('provider') || 'none'
    const account1 = await web3.eth.getAccounts()

    // edge case:
    // connected to wallet
    // but cleared storage
    // then select any wallet
    if ((type === cachedProvider || (cachedProvider !== null && account1.length))) {
      if (account1?.length) {
        address = localStorage.setItem("address", account1[0])
        localStorage.setItem('provider', type)
        setAccount(account1[0])
        setProvider(type)
        login(account1[0])
      } else {
        disconnect()
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
      localStorage.removeItem('address')
      localStorage.removeItem('user')
      localStorage.removeItem('tokens')
    } catch (error) {
      console.log(error)
    }
  }

  const connectOnload = async (type) => {
    await activate(connectors[type])
    const account1 = await web3.eth.getAccounts();

    if (account1.length) {
      localStorage.setItem('address', account1[0])
      localStorage.setItem('provider', type)
      setAccount(account1[0])
    } else {
      disconnect()
    }
  }

  useEffect(() => {
    let isMounted = true
    address = localStorage.getItem('address')
    const cachedProvider = localStorage.getItem('provider') || 'none'

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
    if (window?.ethereum && account !== null) {
      window.ethereum.on('accountsChanged', () => {
        localStorage.removeItem('provider')
        disconnect()
      });

      window.ethereum.on('chainChanged', () => {
        if (typeof window !== undefined) {
          window.location.reload();
        }
      })

      window.ethereum.removeListener('accountsChanged', disconnect)
      window.ethereum.removeListener('chainChanged', () => {})
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