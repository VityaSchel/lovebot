import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Fade from 'react-reveal'

import { declOfRoubles } from '%/utils'

import Button from '%/components/common/Button'
import Heading from '%/components/common/Heading'

import { ReactComponent as Shield } from '../../public/static/shield.svg'
import left from './icons/left.svg'
import right from './icons/right.svg'
import bottom from './icons/bottom.svg'

import styles from './styles.module.scss'
import cn from 'classnames'

export default function Promo({ toggleModal, amount }: { toggleModal: any, amount: number }) {
  const { t } = useTranslation('homePage')

  return (
    <Fade bottom cascade>
      <div className={styles.container}>
        <img src={left} alt='' className={cn(styles.icon, styles.left)} />
        <img src={right} alt='' className={cn(styles.icon, styles.right)} />
        <img src={bottom} alt='' className={cn(styles.icon, styles.bottom)} />

        <Heading variant='h3' center>
          {t('content.title')} <span className={styles.gradient}>{t('content.price')} {amount} {declOfRoubles(amount)}</span>?
        </Heading>
        <div className={styles.button}>
          <Button
            size='large'
            mode='solid'
            buttonProps={{
              onClick: toggleModal
            }}>
            {t('content.tryPrice')} {amount} {declOfRoubles(amount)}
          </Button>
        </div>
        <div className={styles.guard}>
          <Shield /> {t('content.guard')}
        </div>
      </div>
    </Fade>
  )
}
