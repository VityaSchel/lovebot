import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Head from '%/components/common/Head'
import Footer from '%/components/Footer'
import Success from '%/components/Success'

import styles from '%/styles/Success.module.scss'

const SuccessPage = () => {
  const { t } = useTranslation('homePage')

  return (
    <>
      <Head title={t('title')} description={t('description')} />
      <div className={styles.container}>
        <Success />
      </div>
      <Footer />
    </>
  )
}

export default SuccessPage

export async function getStaticProps(context: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
