import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import config from 'react-reveal/globals'

import { getPaymentAmount } from '%/utils'

import Head from '%/components/common/Head'
import Loading from '%/components/common/Loading'

import Header from '%/components/Header'
import Modal from '%/components/Modal'
import Footer from '%/components/Footer'
import Examples from '%/components/Examples'
import Tutorial from '%/components/Tutorial'
import Promo from '%/components/Promo'

import styles from '%/styles/Home.module.scss'

config({ ssrFadeout: true })

const Home: NextPage = () => {
  const { t } = useTranslation('homePage')
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.pay) {
        router.push('/error')
      } else {
        getPaymentAmount({ uuid: router.query.pay }).then(resPaymentAmount => {
          console.log('resPaymentAmount', resPaymentAmount)

          setAmount(resPaymentAmount.amount)
        })
      }
    }
  }, [router.query])

  return (
    <>
      <Head title={t('title')} description={t('description')} />
      <Loading />
      <div className={styles.container}>
        <Header toggleModal={toggleModal} amount={amount} />
        <Modal modal={modal} toggleModal={toggleModal} />
        <Examples />
        <Tutorial toggleModal={toggleModal} amount={amount} />
        <Promo toggleModal={toggleModal} amount={amount} />
        <Footer />
      </div>
    </>
  )
}

export default Home

export async function getStaticProps(context: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
