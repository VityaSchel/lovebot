import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import cx from 'classnames'

import { declOfRoubles } from '%/utils'

import Heading from '%/components/common/Heading'
import Button from '%/components/common/Button'

import { ReactComponent as Logo } from '../../public/static/phonecall.svg'
import friends from './avatars/friends.png'
import enemies from './avatars/enemies.png'
import teacher from './avatars/teacher.png'
import director from './avatars/director.png'

import styles from './styles.module.scss'

function Header({ amount }: { amount: number }) {
  const { t } = useTranslation('homePage')
  const router = useRouter()

  const who = [
    {
      image: friends,
      title: t('content.who1')
    },
    {
      image: director,
      title: t('content.who4')
    },
    {
      image: enemies,
      title: t('content.who2')
    },
    {
      image: teacher,
      title: t('content.who3')
    }
  ]

  function Who() {
    const newWho: Array<Array<{ image: any, title: string }>> = []
    let row = 0

    who.forEach((item, index) => {
      if (!newWho[row]) {
        newWho[row] = []
      }

      newWho[row].push(item)

      if (index % 2 == 1) {
        row++
      }
    })

    return <>
      {newWho.map((row, i) => (
        <div className={styles.whoRow} key={i}>
          {
            row.map(({ image, title }, j) => (
              <div className={styles.whoItem} key={j}>
                <div className={styles.image}>
                  <Image src={image} alt={title} />
                </div>
                <div className={styles.title}>
                  {title}
                </div>
              </div>
            ))
          }
        </div>
      ))}
    </>

  }

  return (
    <header className={cx(styles.header)}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoImage}>
            <Logo />
          </div>
          <div className={styles.logoText}>
            {t('content.lovebot')}
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <Heading variant='h1' center>{t('content.trylovebot')}</Heading>
            <Heading variant='h1' center className={styles.gradient}>{t('content.price')} {amount} {declOfRoubles(
              amount)}</Heading>
          </div>

          <div>{t('content.recordCall')}</div>

          <div className={styles.button}>
            <Button
              size='large'
              mode='solid'
              buttonProps={{
                onClick: () => router.push('/subscription-payment')
              }}>
              {t('content.tryPrice')} {amount} {declOfRoubles(amount)}
            </Button>
          </div>

          <div className={styles.who}>
            <Who />
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
