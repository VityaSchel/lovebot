import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '%/components/common/Button'

import { ReactComponent as HeartIcon } from '%/assets/ModulePage/heartIcon.svg'
import { ReactComponent as VisaLogo } from '%/assets/payments/logos/visa.svg'
import { ReactComponent as MirLogo } from '%/assets/payments/logos/mir.svg'
import { ReactComponent as MastercardLogo } from '%/assets/payments/logos/mastercard.svg'

import styles from '../styles/Module.module.scss'

export default function ModulePage() {
  return (
    <main className={styles.container}>
      <Form
        icon={<HeartIcon />}
        title={'Пранк Бот'}
        module={{
          name: 'Модуль "Пранк Бот"',
          description: 'Пранкует людей через голосовой вызов',
          amount: 1,
          amountWithoutDiscount: 799
        }}
        link='site.com/pay/1506e770-ad77-4b90-8503-a08a5bdfbedc'
      />
    </main>
  )
}

interface FormProps {
  icon: React.ReactNode
  title: string
  module: {
    name: string
    description: string
    amount: number
    amountWithoutDiscount: number
  }
  link: string
}

function Form(props: FormProps) {
  const router = useRouter()

  return (
    <div className={styles.form}>
      <div className={styles.heading}>
        <span className={styles.icon}>
          {props.icon}
        </span>
        <h1>{props.title}</h1>
      </div>
      <div>
        <h2 className={styles.decorationLine}>{props.module.name}</h2>
        <p>{props.module.description}</p>
      </div>
      <div className={styles.priceBlock}>
        <h3 className={styles.decorationLine}>Стоимость подписки <span
          className={styles.orange}>{props.module.amount} ₽</span> в первый месяц</h3>
        <p>Далее {props.module.amountWithoutDiscount} ₽ в месяц</p>
      </div>
      <div className={styles.methodsBlock}>
        <h3 className={styles.decorationLine}>Методы оплаты</h3>
        <p>Банковские карты. VISA, MasterCard, МИР</p>
        <div className={styles.methodsLogos}>
          <div><VisaLogo /></div>
          <div><MirLogo /></div>
          <div><MastercardLogo /></div>
        </div>
      </div>
      <div className={styles.siteLink}>
        <div className={styles.decorationLine}>
          <div className={styles.link}>
            <span>{props.link}</span>
            <Button buttonProps={{
              onClick: () => router.push('/pay/1506e770-ad77-4b90-8503-a08a5bdfbedc')
            }}>Перейти в бота</Button>
          </div>
        </div>
      </div>
      <footer>
        <div className={styles.top}>
          <span>ИП Бондарь М.А.</span>
          <span>ИНН: 310208225142</span>
          <span>ОГРНИП: 321312300035189</span>
        </div>
        <div className={styles.links}>
          <Link href='#'><a>Политика конфиденциальности</a></Link>
          <Link href='#'><a>Пользовательское соглашение</a></Link>
          <Link href='#'><a>Политика обработки данных</a></Link>
          <Link href='#'><a>Отмена подписки</a></Link>
          <Link href='#'><a>Тарифы</a></Link>
        </div>
      </footer>
    </div>
  )
}
