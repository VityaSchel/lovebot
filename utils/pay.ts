// import Router from 'next/router'

type payProps = {
  cloudpayments: any,
  onSuccess: any
}

export function pay(props: payProps) {
  try {
    // @ts-ignore
    const widget = new cp.CloudPayments()

    const { cloudpayments, onSuccess } = props

    widget.pay(
      'charge', // auth или charge
      cloudpayments,
      {
        onSuccess: function(options: any) {
          // действие при успешной оплате
          // Router.push('/success')
         // onSuccess()
        },
        onFail: function(reason: any, options: any) {
          // действие при неуспешной оплате
          console.log('cloudpayments fail: ', reason)
        },
        onComplete: function(paymentResult: any, options: any) {
          //  Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
          // Например, вызов вашей аналитики
        }
      }
    )
  } catch (error: any) {
    console.log('cloudpayments error: ', error)
  }
}
