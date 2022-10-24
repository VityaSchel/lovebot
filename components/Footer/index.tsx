import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import cn from 'classnames'

import { config } from '%/utils'

import styles from './styles.module.scss'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className={cn(styles.footer)}>
      <Link href={`${config.userAgreement}`}>
        <a>{t('footer.privacyPolicy')}</a>
      </Link>

      <Link href={`${config.dataPolicy}`}>
        <a>{t('footer.dataPolicy')}</a>
      </Link>
    </footer>
  )
}
