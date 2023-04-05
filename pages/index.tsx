import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Head from '%/components/common/Head'
import Loading from '%/components/common/Loading'

import Button from '%/components/common/Button'

import { ReactComponent as HeartIcon } from '%/assets/ModulePage/heartIcon.svg'
import { ReactComponent as VisaLogo } from '%/assets/payments/logos/visa.svg'
import { ReactComponent as MirLogo } from '%/assets/payments/logos/mir.svg'
import { ReactComponent as MastercardLogo } from '%/assets/payments/logos/mastercard.svg'

import styles from '../styles/Module.module.scss'
import { config } from '%/utils'


export default function ModulePage() {
  const { t } = useTranslation('homePage')

  return (
    <>
      <Head title={t('title')} description={t('description')} />
      <Loading />
      <main className={styles.container}>
        <Form
          icon={<HeartIcon />}
          title={'Лав Бот'}
          module={{
            name: 'Модуль "Лав Бот"',
            description: 'Лав бот позволяет искать скрытых поклонников ВКонтакте. Уникальная система анализа бота ищет самых активных пользователей, кто посещает страницу и оставляет реакции. С помощью функционала бота можно понять, кто из посетителей наиболее заинтересован твоей страницей и выразить ему взаимную симпатию или понять что-то о своих поклонниках. Бот работает по системе подписки и предоставляет функционал на период её действия. Фунционал бота (проверка пользователя) проводится только из открытых источников, анализу подлежат только открытые страницы ВКонтакте.',
            amount: 1,
            amountWithoutDiscount: 2890
          }}
          link={config.botLink}
        />
      </main>
    </>

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
      {/*<div className={styles.priceBlock}>*/}
      {/*  <h3 className={styles.decorationLine}>Стоимость подписки <span*/}
      {/*    className={styles.orange}>{props.module.amount} ₽</span> за первые 72 часа</h3>*/}
      {/*  <p>{config.mainPageTextSubscriptionPrices}</p>*/}
      {/*</div>*/}
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
              onClick: () => router.push(`https://${props.link}`)
            }}>Перейти в бота</Button>
          </div>
        </div>
      </div>
      <footer>
        <div className={styles.top}>
          <span>{config.companyName}</span>
          <span>ИНН: {config.companyInn}</span>
          <span>ОГРНИП: {config.companyOgrnip}</span>
          {/*<span>EMAIL: {config.contactEmail}</span>*/}
        </div>
        <div className={styles.links}>
          <Link href={`${config.userAgreement}`}><a target='_blank'>Пользовательское соглашение</a></Link>
          <Link href={`${config.dataPolicy}`}><a target='_blank'>Политика обработки данных</a></Link>
          <Link href='/subscription-cancellation'><a>Отмена подписки</a></Link>
          <Link href={`${config.tariffs}`}><a target='_blank'>Тарифы</a></Link>
        </div>
      </footer>
    </div>
  )
}

export async function getStaticProps(context: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
