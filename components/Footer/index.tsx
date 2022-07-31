import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import cn from 'classnames'

import styles from './styles.module.scss'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className={cn(styles.footer)}>
      <Link href='/'>
        <a>{t('footer.privacyPolicy')}</a>
      </Link>

      <Link href='/'>
        <a>{t('footer.dataPolicy')}</a>
      </Link>
    </footer>
  )
}
