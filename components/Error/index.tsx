import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import Button from '%/components/common/Button'
import Heading from '%/components/common/Heading'

import { BiErrorAlt } from 'react-icons/bi'


import styles from './styles.module.scss'

export default function Error() {
  const { t } = useTranslation('homePage')
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <BiErrorAlt/>
      </div>

      <Heading variant='h2' className={styles.title}>
        {t('error.error')}
      </Heading>

      <div className={styles.description}>
        <span>{t('error.check')}</span>
        <span>{t('error.address')}</span>
      </div>
    </div>
  )
}
