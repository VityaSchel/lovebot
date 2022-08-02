import { useTranslation } from 'next-i18next'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import Input from '%/components/common/Input'
import Button from '%/components/common/Button'
import Heading from '%/components/common/Heading'

import { ReactComponent as Card } from './icons/card.svg'
import { ReactComponent as Lock } from './icons/lock.svg'

import styles from './styles.module.scss'

export default function SubscriptionCancel() {
  const { t } = useTranslation('homePage')

  function Form() {
    return (
      <Formik
        initialValues={{
          card_first: '',
          card_last: ''
        }}
        validationSchema={Yup.object().shape({
          card_first: Yup.number().required(t('form_errors.required')),
          card_last: Yup.number().required(t('form_errors.required'))
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 1000)
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.card}>
              <Input
                type="number"
                name="card_first"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.card_first}
                placeholder={t('subscription.card_first')}
                disabled={isSubmitting}
                className={styles.cardInput}
              />

              <Input
                type="number"
                name="card_last"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.card_last}
                placeholder={t('subscription.card_last')}
                disabled={isSubmitting}
                className={styles.cardInput}
              />
            </div>

            <div className={styles.status}>
              <div className={styles.success}>{t('subscription.unsubscribeSuccess')}</div>
              <div className={styles.error}>{t('subscription.unsubscribeFailed')}</div>
            </div>

            <div className={styles.button}>
              <Button
                disabled={isSubmitting || !values.card_first || !values.card_last}
                buttonProps={{
                  onClick: handleSubmit
                }}
              >
                {t('subscription.unsubscribe')}
              </Button>
            </div>

            <div className={styles.cluster}>
              <div className={styles.description}>
                <Card />
                {t('subscription.secure_1')}
              </div>
              <div className={styles.description}>
                <Lock />
                {t('subscription.secure_2')}
              </div>
            </div>
          </form>
        )}
      </Formik>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.cluster}>
        <Heading variant="h1">{t('subscription.q1')}</Heading>
        <div>{t('subscription.a1')}</div>
      </div>
      <div className={styles.cluster}>
        <Heading variant="h2">{t('subscription.q2')}</Heading>
        <div>{t('subscription.a2')}</div>
      </div>
      <div className={styles.cluster}>
        <Heading variant="h2">{t('subscription.q3')}</Heading>
        <div>{t('subscription.a3')}</div>
      </div>
      <div className={styles.cluster}>
        <Heading variant="h1">{t('subscription.card')}</Heading>
        <Form />
      </div>
    </div>
  )
}
