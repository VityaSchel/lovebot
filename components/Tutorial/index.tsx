import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Fade from 'react-reveal'

import Heading from '%/components/common/Heading'
import Button from '%/components/common/Button'

import styles from './styles.module.scss'

import ex1 from './images/ex1.svg'
import ex2 from './images/ex2.png'
import ex3 from './images/ex3.svg'
import { declOfRoubles } from '%/utils'

export default function Tutorial({ amount }: { amount: number }) {
  const { t } = useTranslation('homePage')
  const router = useRouter()

  const contents = [
    {
      id: '01',
      style: { top: '17%', left: '30px' },
      image: ex1,
      title: t('tutorial.t1'),
      description: t('tutorial.d1')
    },
    {
      id: '02',
      style: { top: '25%', left: '30px' },
      image: ex2.src,
      title: t('tutorial.t2'),
      description: t('tutorial.d2')
    },
    {
      id: '03',
      style: { top: '37%', left: '30px' },
      image: ex3,
      title: t('tutorial.t3'),
      description: t('tutorial.d3')
    }
  ]

  return (
    <Fade bottom cascade>
      <div className={styles.container}>
        <div className={styles.heading}>
          <Heading variant='h2' center>
            {t('content.title')}
            <span className={styles.gradient}> {t('content.price')} {amount} {declOfRoubles(amount)}</span>?
          </Heading>
          <Heading variant='h5' center>
            {t('tutorial.description')}
          </Heading>
        </div>

        <div className={styles.rows}>
          {contents.map(({ id, image, title, description, style }) => (
            <div className={styles.row} key={id}>
              <div className={styles.item}>
                <div className={styles.itemId} style={style}>{id}</div>
                <div className={styles.itemImage}>
                  <img src={image} alt={id} />
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemContent}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.description}>{description}</div>
                  <div className={styles.button}>
                    <Button
                      size='medium'
                      mode='solid'
                      buttonProps={{
                        onClick: () => router.push('/subscription-payment')
                      }}>
                      {t('content.tryPrice')} {amount} {declOfRoubles(amount)}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  )
}
