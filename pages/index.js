import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { forwardRef } from 'react';
import ConnectWalletButton from '../components/ConnectWalletButton';

const ImageComponent = forwardRef(({ onClick, href, link, height, width, alt }, ref) => {
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
          cursor: 'pointer'
        }}
      />
    </a>
  )
})


export default function Home() {

  return (
    <div className='container'>
      <Head>
        <title>Ezuna</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <header>
            <Link href="/chapters">
              <h1 style={{
                lineHeight: '50px',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex'
              }}>Chapters</h1>
            </Link>
            <ConnectWalletButton />
          </header>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Link href="/">
              <ImageComponent
                link="/images/ezuna-kage-metakages.png"
                alt="ezuna kage"
                width={300}
                height={300}
              />
            </Link>
          </div>
        </section>

        <section>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div className='img-container'>
              <Image
                loader={({ src, width, quality }) => {
                  return `${src}?w=${width}&q=${quality || 75}`
                }}
                src="/images/1-EzunaBg.png"
                alt="ezuna background"
                width={1300}
                height={1280}
                priority
              />
            </div>
          </div>
        </section>

        <section className='about'>
          <h4 style={{
            textAlign: 'center'
          }}>Who is Ezuna Kage?</h4>
          <div style={{
            marginBottom: 25.6
          }}>
            <p className='about-text'>

              Ezuna is like any other high school student who loves to spend time with her friends and enjoys practicing Kendo. She is boyish, rebellious, and weirdly stronger than most kids.

              Even with all of these, Ezuna has always known that she was different. From memory lapses, constant sleepwalks, her mother’s suicide when she was four, to living with the head of the most powerful Yakuza family in Japan – her estranged father — a ruthless man who trained her in the deadly ways of the sword.

              Nothing made sense growing up, but with her 18th birthday nearing, Ezuna’s life is about to turn upside down.

              The thing is, Ezuna is not just any ordinary high school student with mental and family issues. She is also a ninja. And not just any ninja, but the heir to an ancient curse that affected seven ninja families every fifty years – the reincarnation of Hizune, the most powerful ninja warlord that ever lived!

              Her journey is about to start here, and she wants you to join her in a mission to save the world.
            </p>
          </div>

          <div style={{ textAlign: 'center', paddingTop: 15 }}>
            <a href="" className='link-join-discord'>
              Join us on discord
            </a>
          </div>
        </section>

        <div>
          <Image
            loader={({ src, width, quality }) => {
              return `${src}?w=${width}&q=${quality || 75}`
            }}
            height={426}
            width={1300}
            src="/images/ezunakage-vert.png"
            layout="responsive"
            objectFit="contain"
          />
        </div>

        <section id="chapters">
          <h4>Ezuna Kage Comics</h4>
          <h4> release dates coming soon </h4>
   
          <div>
            <h4>CHAPTER 1</h4>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Link href='/chapters'>
                <ImageComponent
                  link="/images/ezunakage-chap-1.png"
                  width={449}
                  height={333}
                  alt="chapters"
                />
              </Link>
            </div>

            <div style={{ textAlign: 'center', paddingTop: 15 }}>
              <a href="/chapters" className='link-join-discord'>
                Read
              </a>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: 'auto', justifyContent: 'center'}}>
            <p className='mobile-text'>Metakages NFT holder gets to read the story of Ezuna for free via the metakages website and the kage app.</p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Image
                loader={({ src, width, quality }) => {
                  return `${src}?w=${width}&q=${quality || 75}`
                }}
                src="/images/metakage-webapp-kageapp-2048x1676.png"
                alt="metakage webapp"
                width={1024}
                height={838}
              />
            </div>

            <p className='mobile-text'> Ezuna Comics NFT Holders get voting rights to the story arc of the main characters </p>

            <p className='mobile-text'> Ezuna Comics NFT Holders get the physical comics sent to their address of choice. Physical comics will be released per volume. Each volume is 10 chapters. How to claim physical comic will be announced on the 10th chapter releases </p>

            <p className='mobile-text'> Subscription fee are for those who are not in the NFT space but would like to get the physical copy! </p>

            <button className='button'>Get yours now</button>
          </div>
        </section>

        <section>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div className='img-container'>
              <Image
                loader={({ src, width, quality }) => {
                  return `${src}?w=${width}&q=${quality || 75}`
                }}
                src="/images/FNiK8hOVEAMYbaM-788x1024.jpg"
                alt="ezuna"
                width={923}
                height={1200}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}