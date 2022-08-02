import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'

import Head from '%/components/common/Head'
import SubscriptionCancel from '%/components/SubscriptionCancel'

import { ReactComponent as Logo } from '%/public/static/logo.svg'

import styles from '%/styles/SubscriptionCancellation.module.scss'

const SubscriptionCancellation = () => {
  const { t } = useTranslation('homePage')

  return (
    <>
      <Head title={t('title')} description={t('description')} />
      <main className={styles.container}>
        <div className={styles.form}>
          <div className={cn(styles.heading, styles.decorationLine)}>
            <h1>Отмена подписки</h1>
            <div className={styles.iconContainer}>
              <span className={styles.icon}>
                <Logo />
              </span><h1>ПранкБот</h1>
            </div>
          </div>
          <div className={styles.info}>
            <SubscriptionCancel />
          </div>
        </div>
      </main>
    </>
  )
}

export default SubscriptionCancellation

export async function getStaticProps(context: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
