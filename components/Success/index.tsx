import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from '%/components/common/Button'
import Heading from '%/components/common/Heading'

import styles from './styles.module.scss'

import success from '%/public/static/success.png'

export default function Success() {
  const { t } = useTranslation('homePage')
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Link href='/'><a className={styles.link}>{t('payment.toMain')}</a></Link>

      <div className={styles.image}>
        <Image src={success} />
      </div>

      <Heading variant='h2' className={styles.title}>
        {t('payment.orderPlaced')}
      </Heading>

      <div className={styles.description}>
        <span>{t('payment.checkSpecified')}</span>
        <span>{t('payment.mailingAddress')}</span>
      </div>

      <div className={styles.description}>
        <span>{t('payment.noInbox')}</span>
        <span>{t('payment.checkSpam')}</span>
      </div>

      <div className={styles.button}>
        <Button buttonProps={{ onClick: () => router.push('/') }}>{t('payment.checkMail')}</Button>
      </div>
    </div>
  )
}
