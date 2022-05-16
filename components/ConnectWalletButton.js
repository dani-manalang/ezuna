import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { ellipseAddress } from '../lib/utilities';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useConnectWallet from '../hooks/useConnectWallet';
import detectEthereumProvider from '@metamask/detect-provider';

export default function ConnectWalletButton() {
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [provider, setProvider] = useState(null)

  const { connect, disconnect, myAccount } = useConnectWallet(provider);
  useOnClickOutside(ref, () => setModalOpen(false));

  const handleProvider = async () => {
    const ethProvider = await detectEthereumProvider()

    if (ethProvider) {
      setProvider(ethProvider)
    }

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    let isMounted = true

    if (isMounted) handleProvider()

    return () => {
      isMounted = false
    }
  }, [])

  const connectWallet = (type) => {
    setModalOpen(false)
    connect(type)
  }

  const disconnectWallet = () => {
    setModalOpen(false)
    disconnect()
  }

  if (loading) {
    return <div className='connect-button'>
      <button className="button-dark" type="button" disabled>
        Loading...
      </button>
    </div>
  }

  return (
    <div className='connect-button'>
      {myAccount ? (
        <div>
          <div onClick={() => setModalOpen(true)}>
            <p style={{ textAlign: 'center', margin: 0 }}>{ellipseAddress(myAccount)}</p>
          </div>
        </div>
      ) : (
        <button className="button-dark" type="button" onClick={() => setModalOpen(true)}>
          Connect
        </button>
      )}

      <Modal
        ref={ref}
        onClose={() => setModalOpen(false)}
        show={isModalOpen}
      >
        {
          myAccount ? (
            <div className='connect-btn-container'>
              <p className='wallet-address'>{ellipseAddress(myAccount)}</p>
              <button onClick={() => disconnectWallet()} className='disconnect-btn'>Disconnect</button>
            </div>
          ) : (
            <>
              <h1 className='modal-title'>Connect Wallet</h1>
              <p className='modal-body-text'>Please authorize this website to access your Ethereum account.</p>
              <div className='connect-btn-container'>
                <button
                  className='connect-btn'
                  onClick={() => connectWallet('coinbaseWallet')}
                >
                  <Image
                    loader={({ src, width, quality }) => {
                      return `${src}?w=${width}&q=${quality || 75}`
                    }}
                    src='/images/coinbase.png'
                    alt='coinbase'
                    width={30}
                    height={30}
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                  <p className='connect-btn-label'>Coinbase</p>
                </button>
                {
                  provider && (
                    <button
                      className='connect-btn'
                      onClick={() => connectWallet('injected')}
                    >
                      <Image
                        loader={({ src, width, quality }) => {
                          return `${src}?w=${width}&q=${quality || 75}`
                        }}
                        src='/images/metamask.png'
                        alt='metamask'
                        width={30}
                        height={30}
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                      <p className='connect-btn-label'>Metamask</p>
                    </button>
                  )
                }
              </div>
            </>
          )
        }
      </Modal>
    </div>
  )
}
