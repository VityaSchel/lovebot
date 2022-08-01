import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { getPaymentData, pay } from '%/utils'

import Input from '%/components/common/Input'
import Checkbox from '%/components/common/Checkbox'
import Button from '%/components/common/Button'

import { ReactComponent as HeartIcon } from '%/assets/ModulePage/heartIcon.svg'
import { ReactComponent as ShieldIcon } from '%/assets/payments/shield.svg'

import styles from '%/styles/SubscriptionPayment.module.scss'

export default function SubscriptionPaymentPage() {
  return (
    <main className={styles.container}>
      <Info
        icon={<HeartIcon />}
        title={'LoveBot'}
        subscription={{
          monthlyPrice: 299
        }}
      />
    </main>
  )
}

interface InfoProps {
  icon: React.ReactNode
  title: string
  subscription: {
    monthlyPrice: number
  }
}

function Info(props: InfoProps) {
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
        <div className={styles.securePayment}>
          <ShieldIcon />
          <span>Безопасная оплата</span>
        </div>
        <h2>Попробуй подписку всего за</h2>
        <div className={styles.price}>
          <span className={styles.number}>1</span>
          <span className={styles.label}>рубль</span>
        </div>
        <span className={styles.insteadOfPrice}>
          вместо <span className={styles.strikethrough}>790 ₽</span>
        </span>
        <Form />
        <span className={styles.footer}>1 ₽ первый месяц, далее 790 ₽</span>
      </div>
    </div>
  )
}

function Form(props: any) {
  const { t } = useTranslation(['auth', 'common'])
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
            .email(t('form_errors.email_format_invalid', { ns: 'common' }))
            .required(t('form_errors.required', { ns: 'common' })),
          personalDataAgreement: Yup.bool()
            .equals([true], t('form_errors.must_be_checked', { ns: 'common' }))
            .required(t('form_errors.required', { ns: 'common' })),
          autoPayAgreement: Yup.bool()
            .equals([true], t('form_errors.must_be_checked', { ns: 'common' }))
            .required(t('form_errors.required', { ns: 'common' }))
        })
      }
      onSubmit={(values, { setSubmitting }) => {
        getPaymentData({ uuid: router.query.uuid }).then(resPaymentData => {
          pay(resPaymentData)
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
            Нажимая кнопку “Оплатить” Вы даете согласие на <Link href='#'><a className={styles.termsLink}>обработку
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
            размере 1₽ через 72 часа после подписки, и далее согласно тарифу раз в 7 дней 199₽ или 49₽ за день
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps(context: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'homePage']))
    }
  }
}
