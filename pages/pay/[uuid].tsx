import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

import {
  config,
  declOfRoubles,
  getPaymentAmount,
  getPaymentData,
  setPaymentEmail,
  pay,
  getCompanyStatus
} from '%/utils'

import Heading from '%/components/common/Heading'
import Input from '%/components/common/Input'
import Checkbox from '%/components/common/Checkbox'
import Button from '%/components/common/Button'
import LinkDeactivatedModal from '%/components/LinkDeactivatedModal'

import { ReactComponent as Logo } from '%/assets/ModulePage/heartIcon.svg'
import { ReactComponent as ShieldIcon } from '%/assets/payments/shield.svg'

import styles from '%/styles/SubscriptionPayment.module.scss'

export default function SubscriptionPaymentPage(props: any) {
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  const [showTextWithPrices, setShowTextWithPrices] = React.useState(false)
  const [showCheckboxes, setShowCheckboxes] = React.useState(false)
  const [viewLinkDeactivated, setViewLinkDeactivated] = React.useState(false)

  let verifyCheckbox = true

  const hasTextWithPrices = (companyStatus: string): boolean => {
    const params = new URLSearchParams(window.location.search)

    if (!params.has('ads')) {
      return true
    }

    if (Cookies.get('visited') !== undefined) {
      return true
    }

    return !(companyStatus === 'active' || companyStatus === 'active_checkboxes');
  }

  const hasCheckboxes = (companyStatus: string): boolean => {
    const params = new URLSearchParams(window.location.search)

    if (!params.has('ads')) {
      return true
    }

    if (Cookies.get('visited') !== undefined) {
      return true
    }

    return companyStatus !== 'active';
  }

  React.useEffect(() => {
    switch (props.paymentStatus) {
      case 'paid':
        setViewLinkDeactivated(true)
        break
      case 'canceled':
        setViewLinkDeactivated(true)
        break
      default:
        setViewLinkDeactivated(false)
        break
    }
  }, [props])

  React.useEffect(() => {
    if (!verifyCheckbox) return
    verifyCheckbox = false

    setShowTextWithPrices(hasTextWithPrices(props.companyStatus))
    setShowCheckboxes(hasCheckboxes(props.companyStatus))
    Cookies.set('visited', (new Date()).toISOString())

  }, [])

  function Form() {
    const { t } = useTranslation(['homePage', 'common'])
    const router = useRouter()

    return (
        <Formik
            initialValues={{
              email: '',
              // personalDataAgreement: !showCheckboxes,
              // autoPayAgreement: !showCheckboxes
              personalDataAgreement: true,
              autoPayAgreement: true
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
              setPaymentEmail({ email: values.email, uuid: router.query.uuid }).then(resPaymentInfo => {
                getPaymentData({ uuid: router.query.uuid }).then(resPaymentData => {
                  const { cloudpayments } = resPaymentData

                  pay({ cloudpayments, onSuccess: () => setSuccess(true) })
                  setSubmitting(false)
                })
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
                  Согласен с политикой обработки персональных данных, правилами предоставления услуг по подписке,&nbsp;
                  <Link href={`${config.tariffs}`}>
                    <a target='_blank' className={styles.termsLink}>
                      офертой рекуррентных платежей
                    </a>
                  </Link>,&nbsp;<Link href={`${config.userAgreement}`}>
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
                  Я согласен подключить автоматические платежи по подписке. Сумма списаний согласно &nbsp;
                  <Link href={`${config.tariffs}`}>
                    <a target='_blank' className={styles.termsLink}>
                      тарифам
                    </a>
                  </Link> составит {config.textSecondCheckbox}
                </Checkbox>}
                <div>
                  <Button
                      disabled={isSubmitting || showCheckboxes && (!values.personalDataAgreement || !values.autoPayAgreement)}
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
            <h1>Оплата счета</h1>
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
                    {showTextWithPrices &&
                        <span className={styles.warningTitle}>Подписка на функционал ЛавБота</span>}

                    {
                      showTextWithPrices
                          ? <>
                            {/* <h2>Попробуй всего за</h2> */}
                            <div className={styles.price}>
                              <span className={styles.number}>1</span>
                              <span className={styles.label}>рубль</span>
                            </div>
                          </>
                          : <>
                            <h2>Попробуй всего за</h2>
                            <div className={styles.price}>
                              <span className={styles.number}>{amount}</span>
                              <span className={styles.label}>{declOfRoubles(amount)}</span>
                            </div>
                          </>
                    }
                    {/*<span className={styles.insteadOfPrice}>вместо <span*/}
                    {/*  className={styles.strikethrough}>{amountWithoutDiscount} ₽</span></span>*/}
                    {showTextWithPrices &&
                        <span className={styles.warningTitle}>{config?.payPageTextSubscriptionPrices}</span>}
                    <Form />
                    {/* <span className={styles.footer}>{amount} ₽ первый месяц, далее {amountWithoutDiscount} ₽</span> */}
                  </>
            }
          </div>
          <footer>
            <div className={styles.top}>
              <span>{config.companyName}</span>
              <span>ИНН: {config.companyInn}</span>
              <span>ОГРНИП: {config.companyOgrnip}</span>
              <span>EMAIL: {config.contactEmail}</span>
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
        <LinkDeactivatedModal view={viewLinkDeactivated} />
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

  const paymentData = await getPaymentAmount({ uuid: uuid })

  if (!paymentData) {
    return errorRedirect()
  }

  const adsArgument = context.query.ads
  let companyStatus = 'deactivated'

  if (adsArgument) {
    const companyID = Number(adsArgument)

    if (Number.isInteger(companyID)) {
      companyStatus = await getCompanyStatus(companyID)
    }
  }

  return {
    props: {
      companyStatus,
      paths: [],
      fallback: true,
      paymentStatus: paymentData.status,
      amount: paymentData.amount,
      amountWithoutDiscount: paymentData.amountWithoutDiscount,
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
