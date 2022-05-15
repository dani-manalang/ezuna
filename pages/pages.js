import React, { useEffect, forwardRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import constants from '../constants';
import { TiChevronLeft } from 'react-icons/ti';
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

export default function Pages() {
  const [pages, setPages] = useState([]);

  const router = useRouter()
  const { chapterId } = router.query

  useEffect(() => {
    if (chapterId) {
      axios.get(`${constants.origin}/v1/comics/default/${chapterId}`).then(response => {
        setPages(response?.data?.pages)
      });
    }
  }, [chapterId])

  return (
    <div className='container'>
      <Head>
        <title>Ezuna | Pages</title>
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
              <Link href='/chapters'>
                <div style={{ cursor: 'pointer' }}>
                  <h6><TiChevronLeft size={18}/> Back to All Chapters</h6>
                </div>
              </Link>
            </div>
            {
              pages.map((page) => {
                return (
                  <div key={page.id}>
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}>
                        <Image
                          loader={({ src, width, quality }) => {
                            return `${src}?w=${width}&q=${quality || 75}`
                          }}
                          src={`${constants.origin}${page.imageUrl}`}
                          width={449}
                          height={333}
                          alt="page"
                        />
                      </div>
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
