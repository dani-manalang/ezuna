import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { ellipseAddress } from '../lib/utilities';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useConnectWallet from '../hooks/useConnectWallet';

export default function ConnectWalletButton() {
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const { connect, disconnect, account, loading, hasProvider } = useConnectWallet();
  useOnClickOutside(ref, () => setModalOpen(false));

  if (loading) {
    return <div className='connect-button'>
      <button className="button-dark" type="button" onClick={() => setModalOpen(true)}>
        Loading...
      </button>
    </div>
  }

  return (
    <div className='connect-button'>
      {hasProvider && (
        account ? (
          <div>
            <div onClick={() => setModalOpen(true)}>
              <p style={{ textAlign: 'center', margin: 0 }}>{ellipseAddress(account)}</p>
            </div>
          </div>
        ) : (
          <button className="button-dark" type="button" onClick={() => setModalOpen(true)}>
            Connect
          </button>
        )
      )}

      <Modal
        ref={ref}
        onClose={() => setModalOpen(false)}
        show={isModalOpen}
      >
        {
          account ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <p style={{ textAlign: 'center', margin: '10px 0'}}>{ellipseAddress(account)}</p>
              <button onClick={() => {
                setModalOpen(false)
                disconnect()
              }} style={{ padding: 10, cursor: 'pointer' }}>Disconnect</button>
            </div>
          ) : (
            <>
              <h1 style = {{
                fontSize: 44,
                fontWeight: 700,
                paddingBottom: 29
              }}>Connect Wallet</h1>
              <p style={{ fontSize: 22 }}>Please authorize this website to access your Ethereum account.</p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <button onClick={() => {
                  setModalOpen(false)
                  connect('coinbaseWallet')
                }}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      verticalAlign: 'middle',
                      textAlign: 'center',
                      alignItems: 'center',
                      padding: 10,
                      cursor: 'pointer'
                    }}
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
                    <p style={{
                      margin: 0,
                      paddingLeft: 10,
                    }}>Coinbase Wallet</p>
                </button>
                <button onClick={() => {
                  setModalOpen(false)
                  connect('injected')
                }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    verticalAlign: 'middle',
                    textAlign: 'center',
                    alignItems: 'center',
                    padding: 10,
                    cursor: 'pointer'
                  }}
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
                    <p style={{
                      margin: 0,
                      paddingLeft: 10,
                    }}>Metamask</p>
                </button>
              </div>
            </>
          )
        }
      </Modal>
    </div>
  )
}
