import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import { declOfRoubles, getPaymentAmount, getPaymentData, isCompanyActive, pay } from '%/utils'

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
  const [showCheckboxes, setShowCheckboxes] = React.useState(false)
  let verifyCheckbox = true

  const hasCheckboxes = (companyActive: boolean): boolean => {
    if (Cookies.get('visited') === undefined) {
      const params = new URLSearchParams(window.location.search)
      if (params.has('ads') && companyActive) {
        Cookies.set('visited', (new Date()).toISOString())

        const params = new URLSearchParams(window.location.search)
        params.delete('ads')
        window.history.pushState({}, '', window.location.pathname + (params.toString() && '?' + params.toString()))

        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  React.useEffect(() => {
    if (!verifyCheckbox) return
    verifyCheckbox = false
    setShowCheckboxes(hasCheckboxes(props.companyActive))
  }, [])

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
            {showCheckboxes && <Checkbox
              id='perdonal_data_agreement'
              value={values.personalDataAgreement}
              onChange={value => setFieldValue('personalDataAgreement', value)}
              disabled={isSubmitting}
              className={styles.terms}
              longLabel
            >
              Согласен с политикой обработки персональных данных, правилами предоставления услуг по подписке, <Link
              href='/static/tarifes.pdf'>
              <a target='_blank' className={styles.termsLink}>
                офертой рекуррентных платежей
              </a>
            </Link>, <Link href='/static/tarifes.pdf'>
              <a target='_blank' className={styles.termsLink}>
                договором-офертой и условиями использования
              </a>
            </Link>
            </Checkbox>}
            {showCheckboxes && <Checkbox
              id='auto_pay_agreement'
              value={values.autoPayAgreement}
              onChange={value => setFieldValue('autoPayAgreement', value)}
              disabled={isSubmitting}
              className={styles.terms}
              longLabel
            >
              Я согласен подключить <b>автоматические</b> платежи по подписке. Сумма списаний согласно <Link
              href='/static/tarifes.pdf'>
              <a target='_blank' className={styles.termsLink}>
                тарифам
              </a>
            </Link> составит
              1 рублей за получение пробного журнала. В дальнейшем, <b>через 6 часов после получения пробного журнала,
              списывается 3290 рублей за каждый месяц использования сервиса</b>. В случае нехватки средств, мы переведем
              вас на тариф со списаниями по <b>1690 руб каждые две недели, по 890 руб каждую неделю и 190 руб за каждые
              сутки</b>.
            </Checkbox>}
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

  const adsArgument = context.query.ads
  let companyActive = false

  if (adsArgument) {
    const companyID = Number(adsArgument)

    if (Number.isInteger(companyID)) {
      companyActive = await isCompanyActive(companyID)
    }
  }

  return {
    props: {
      companyActive,
      paths: [],
      fallback: true,
      amount: amountData.amount,
      amountWithoutDiscount: amountData.amountWithoutDiscount,
      payment: paymentData,
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
