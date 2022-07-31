import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Head from '%/components/common/Head'
import Footer from '%/components/Footer'
import Error from '%/components/Error'

import styles from '%/styles/Error.module.scss'

const ErrorPage = () => {
  const { t } = useTranslation('homePage')

  return (
    <>
      <Head title={t('title')} description={t('description')} />
      <div className={styles.container}>
        <Error />
      </div>
      <Footer />
    </>
  )
}

export default ErrorPage

export async function getStaticProps(context: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
