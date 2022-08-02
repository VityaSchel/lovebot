import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { declOfRoubles, getPaymentAmount, getPaymentData, pay } from '%/utils'

import Heading from '%/components/common/Heading'
import Input from '%/components/common/Input'
import Checkbox from '%/components/common/Checkbox'
import Button from '%/components/common/Button'

import { ReactComponent as Logo } from '%/public/static/logo.svg'
import { ReactComponent as ShieldIcon } from '%/assets/payments/shield.svg'

import styles from '%/styles/SubscriptionPayment.module.scss'

export default function SubscriptionPaymentPage(props: any) {
  const router = useRouter()
  const [success, setSuccess] = useState(false)

  function Form(props: any) {
    const { t } = useTranslation(['homePage', 'common'])
    const router = useRouter()

    return (
        <Formik
            initialValues={{
              email: '',
              personalDataAgreement: false,
              autoPayAgreement: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string()
                    .email(t('form_errors.email_format_invalid', { ns: 'homePage' }))
                    .required(t('form_errors.required', { ns: 'homePage' })),
                personalDataAgreement: Yup.bool()
                    .equals([true], t('form_errors.must_be_checked', { ns: 'homePage' }))
                    .required(t('form_errors.required', { ns: 'homePage' })),
                autoPayAgreement: Yup.bool()
                    .equals([true], t('form_errors.must_be_checked', { ns: 'homePage' }))
                    .required(t('form_errors.required', { ns: 'homePage' }))
              })
            }
            onSubmit={(values, { setSubmitting }) => {
              getPaymentData({ uuid: router.query.uuid }).then(resPaymentData => {
                const { cloudpayments } = resPaymentData

                pay({ cloudpayments, onSuccess: () => setSuccess(true) })
                setSubmitting(false)
              })
            }}
        >
          {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit}>
                <Input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder={'Введите ваш email'}
                    disabled={isSubmitting}
                    className={styles.email}
                />
                <Checkbox
                    id='perdonal_data_agreement'
                    value={values.personalDataAgreement}
                    onChange={value => setFieldValue('personalDataAgreement', value)}
                    disabled={isSubmitting}
                    className={styles.terms}
                    longLabel
                >
                  Нажимая кнопку “Оплатить” Вы даете согласие на <Link href='/static/data_policy.pdf'><a target='_blank'
                                                                                                         className={styles.termsLink}>обработку
                  персональных данных</a></Link>, а также подтверждаете ознакомление с публичной офертой.
                </Checkbox>
                <Checkbox
                    id='auto_pay_agreement'
                    value={values.autoPayAgreement}
                    onChange={value => setFieldValue('autoPayAgreement', value)}
                    disabled={isSubmitting}
                    className={styles.terms}
                    longLabel
                >
                  Нажимая кнопку “Оплатить” Вы подтверждаете ознакомление с автоматическими списаниями. Первое списание в
                  размере {props.subscription.amount}₽ через 72 часа после подписки, и далее согласно тарифу раз в
                  месяц {props.subscription.amountWithoutDiscount} ₽
                </Checkbox>
                <div>
                  <Button
                      disabled={isSubmitting || !values.personalDataAgreement || !values.autoPayAgreement}
                      buttonProps={{
                        onClick: handleSubmit
                      }}
                  >Оплатить</Button>
                </div>
              </form>
          )}
        </Formik>
    )
  }

  function PaymentSuccess() {
    return (
        <div className={styles.success}>
          <Heading variant='h3'>Спасибо за подписку!</Heading>
          <div className={styles.button}>
            <Button
                buttonProps={{
                  onClick: () => router.push('/')
                }}>
              Перейти к сервису
            </Button>
          </div>
        </div>
    )
  }

  interface InfoProps {
    icon: React.ReactNode
    title: string
    subscription: {
      amount: number,
      amountWithoutDiscount: number,
    }
  }

  function Info(props: InfoProps) {
    const { amount, amountWithoutDiscount } = props.subscription

    return (
        <div className={styles.form}>
          <div className={[styles.heading, styles.decorationLine].join(' ')}>
            <h1>Оплата подписки</h1>
            <div className={styles.iconContainer}>
          <span className={styles.icon}>
            {props.icon}
          </span>
              <h1>{props.title}</h1>
            </div>
          </div>
          <div className={styles.info}>
            {
              success ?
                  <PaymentSuccess /> :
                  <>
                    <div className={styles.securePayment}>
                      <ShieldIcon />
                      <span>Безопасная оплата</span>
                    </div>
                    <h2>Попробуй подписку всего за</h2>
                    <div className={styles.price}>
                      <span className={styles.number}>{amount}</span>
                      <span className={styles.label}>{declOfRoubles(amount)}</span>
                    </div>
                    <span className={styles.insteadOfPrice}>вместо <span
                        className={styles.strikethrough}>{amountWithoutDiscount} ₽</span></span>
                    <Form subscription={props.subscription} />
                    <span className={styles.footer}>{amount} ₽ первый месяц, далее {amountWithoutDiscount} ₽</span>
                  </>
            }
          </div>
        </div>
    )
  }

  return (
      <main className={styles.container}>
        <Info
            icon={<Logo />}
            title={'ЛавБот'}
            subscription={{
              amount: props.amount,
              amountWithoutDiscount: props.amountWithoutDiscount
            }}
        />
      </main>
  )
}

export async function getServerSideProps(context: any) {
  const errorRedirect = () => ({
    redirect: {
      destination: '/error',
      permanent: false
    }
  })

  const { uuid } = context.query

  if (!uuid) {
    return errorRedirect()
  }

  const [amountData, paymentData] = await Promise.all([
    getPaymentAmount({ uuid: uuid }),
    getPaymentData({ uuid: uuid })
  ])

  if (!amountData || !paymentData) {
    return errorRedirect()
  }

  return {
    props: {
      paths: [],
      fallback: true,
      amount: amountData.amount,
      amountWithoutDiscount: amountData.amountWithoutDiscount,
      payment: paymentData,
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
