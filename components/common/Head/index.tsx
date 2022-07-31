import Head from 'next/head'
import PropTypes from 'prop-types'

import banner from '%/public/android-chrome-512x512.png'

CustomHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node
}

interface CustomHeadProps {
  title: string
  description: string
  children?: React.ReactNode
}

export default function CustomHead(props: CustomHeadProps) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      {props.children}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#F56B18" />
      <meta name="apple-mobile-web-app-title" content="Bot.biz" />
      <meta name="application-name" content="Bot.biz" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta property="og:title" content={`${props.title} — Bot.Biz`} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={banner.src} />
      <meta property="og:image:width" content={String(banner.width)} />
      <meta property="og:image:height" content={String(banner.height)} />
    </Head>
  )
}
