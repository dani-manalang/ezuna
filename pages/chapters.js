import React, { useEffect, forwardRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import constants from '../constants';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import ConnectWalletButton from '../components/ConnectWalletButton';

const ImageComponent = forwardRef(({ onClick, href, link, height, width, alt, withBorder = false }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Image
        loader={({ src, width, quality }) => {
          return `${src}?w=${width}&q=${quality || 75}`
        }}
        src={link}
        alt={alt}
        width={width}
        height={height}
        style={{
          cursor: 'pointer',
        }}
        className={withBorder ? 'chapter-img' : ''}
      />
    </a>
  )
})

export default function Chapters() {
  const [chapters, setChapters] = useState([]);
  
  useEffect(() => {
    axios.get(`${constants.origin}/v1/comics/default`).then(response => {
      setChapters(response?.data?.chapters);
    });

  }, [])

  return (
    <div className='container'>
      <Head>
        <title>Ezuna | Chapters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <header>
            <div className='invisible'></div>
            <div className='logo'>
              <Link href='/'>
                <ImageComponent
                  link="/images/ezuna-kage-metakages-4x-300x300.png"
                  height={213}
                  width={213}
                  alt="logo"
                />
              </Link>
            </div>

            <ConnectWalletButton />
          </header>

          <div>
            <div style={{
              padding: '70px 0'
            }}>
              <h5>Chapters</h5>
            </div>
            {
              chapters.map((chapter) => {
                return (
                  <div key={chapter.id}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                      <Link href={`/pages?chapterId=${chapter.id}`}>
                        <ImageComponent
                          link={`${constants.origin}${chapter.coverPhoto}`}
                          width={441}
                          height={325}
                          alt="chapter"
                          withBorder
                        />
                      </Link>
                    </div>

                    <div style={{ textAlign: 'center', paddingTop: 37, paddingBottom: 63 }}>
                      <p style={{
                        fontSize: 32,
                        fontWeight: 700,
                        lineHeight: '39px',
                        letterSpacing: '0.02em'
                      }}>
                        {chapter.chapter == 1
                        ? (<AiFillLock height={32} width={28} style={{ marginBottom: -5, marginRight: 14 }} />)
                        : (<AiFillUnlock height={32} width={28} style={{ marginBottom: -5, marginRight: 14 }} />)}
                        
                        {`CHAPTER ${chapter.chapter}`}
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
      </main>
    </div>
  )
}