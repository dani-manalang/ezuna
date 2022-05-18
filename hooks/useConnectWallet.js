import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from '../lib/connectors';
import getRefreshToken from "../pages/api/getRefreshToken";

const useConnectWallet = (provider) => {
  const [myAccount, setMyAccount] = useState()
  const [wallet, setWallet] = useState(null)
  const { activate, deactivate, account } = useWeb3React()

  const login = (walletAddress) => {
    getRefreshToken(walletAddress).then(() => window.location.reload());
  }

  const handleAccountChanged = async (type) => {
    try {
      await activate(connectors[type])
    } catch (error) {
      console.log(error)
    }
  }

  async function connect(type) {
    try {
      setWallet(type)
      handleAccountChanged(type)
    } catch (error) {
      console.log(error)
    }
  }

  async function disconnect() {
    try {
      setMyAccount(null)
      deactivate()
      localStorage.removeItem('address')
      localStorage.removeItem('tokens')

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isMounted = true
    const address = localStorage.getItem('address')
    const cachedProvider = localStorage.getItem('provider')

    if (isMounted) {
      setWallet(cachedProvider)
      if (address !== null && cachedProvider !== null) {
        handleAccountChanged(cachedProvider)
      }
    }

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true;

    if (window?.ethereum && isMounted) {
      window.ethereum.on('accountsChanged', (newAccount) => {
        if (!newAccount.length) {
          localStorage.removeItem('provider')
          disconnect()
        }
      });

      window.ethereum.on('chainChanged', () => {
        if (typeof window !== undefined) {
          window.location.reload();
        }
      })
    }

    return () => {
      window.ethereum.removeListener('accountsChanged', () => {})
      window.ethereum.removeListener('chainChanged', () => { })
      isMounted = false;
    }
  }, [provider])

  useEffect(() => {
    let isMounted = true;

    if (isMounted && account !== undefined) {
        setMyAccount(account)
        localStorage.setItem('provider', wallet)
        localStorage.setItem('address', account)
    }

    if (isMounted && localStorage.getItem('address') !== null) {
      setMyAccount(localStorage.getItem('address'))
    }

    return () => {
      isMounted = false
    }
    
  }, [account])

  useEffect(() => {
    if (myAccount && localStorage.getItem('tokens') === null) {
      login(myAccount)
    }
  }, [myAccount])

  return {
    account,
    setMyAccount,
    connect,
    disconnect,
    myAccount
  }
}

export default useConnectWallet;