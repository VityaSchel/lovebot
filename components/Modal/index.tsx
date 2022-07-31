import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'

import { getPaymentData, pay } from '%/utils'

import Heading from '%/components/common/Heading'
import Input from '%/components/common/Input'
import Checkbox from '%/components/common/Checkbox'
import Button from '%/components/common/Button'

import { ReactComponent as Close } from '%/public/static/close.svg'

import styles from './styles.module.scss'

export default function Modal({ modal, toggleModal }: { modal: boolean, toggleModal: any }) {
  const { t } = useTranslation('homePage')
  const router = useRouter()

  function Form() {
    return (
      <Formik
        initialValues={{
          email: '',
          agree: false
        }}
        validationSchema={
          Yup.object().shape({
            email: Yup.string()
              .email(t('form_errors.email_format_invalid'))
              .required(t('form_errors.required')),
            agree: Yup.bool()
              .equals([true], t('form_errors.must_be_checked'))
              .required(t('form_errors.required'))
          })
        }
        onSubmit={(values, { setSubmitting }) => {
          getPaymentData({ uuid: router.query.pay }).then(resPaymentData => {
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
              placeholder={t('modal.enterEmail')}
              disabled={isSubmitting}
              className={styles.email}
            />
            <Checkbox
              id='agree'
              value={values.agree}
              onChange={value => setFieldValue('agree', value)}
              disabled={isSubmitting}
              className={styles.terms}
              longLabel={false}
            >
              <span className={styles.agree}>{t('modal.agreeWith')}</span>
              <Link href='/' target='_blank'>
                <a className={styles.agree}>{t('modal.sitePolicy')}</a>
              </Link>
            </Checkbox>
            <Button
              size='medium'
              disabled={isSubmitting || !values.agree}
              buttonProps={{
                onClick: handleSubmit
              }}>
              {t('modal.pay')}
            </Button>
          </form>
        )}
      </Formik>
    )
  }

  return (
    <div className={cn(styles.modal, { [styles.modalShow]: modal })}>
      <div className={styles.modalBack} />
      <div className={styles.container}>
        <div className={styles.heading}>
          <Heading variant='h2' center>
            {t('content.prank')}
          </Heading>
          <Close onClick={toggleModal} className={styles.close} />
        </div>

        <Form />
      </div>
    </div>
  )
}
