import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import cn from 'classnames'

import { configLinks } from '%/utils'

import styles from './styles.module.scss'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className={cn(styles.footer)}>
      <Link href={configLinks.userAgreement}>
        <a>{t('footer.privacyPolicy')}</a>
      </Link>

      <Link href={configLinks.dataPolicy}>
        <a>{t('footer.dataPolicy')}</a>
      </Link>
    </footer>
  )
}
