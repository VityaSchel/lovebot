import Cookies from 'js-cookie'

type payProps = {
  cloudpayments: any,
  onSuccess: any
}

export function pay(props: payProps) {
  try {
    const widget = new cp.CloudPayments()

    const { cloudpayments, onSuccess } = props

    widget.pay(
      'charge', // auth или charge
      cloudpayments,
      {
        onSuccess: function(options: any) {
          // действие при успешной оплате
         // onSuccess()
        },
        onFail: function(reason: any, options: any) {
          // действие при неуспешной оплате
          console.log('cloudpayments fail: ', reason)
        },
        onComplete: function(paymentResult: any, options: any) {
          //  Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
          // Например, вызов вашей аналитики
            Cookies.delete('visited')
        }
      }
    )
  } catch (error: any) {
    console.log('cloudpayments error: ', error)
  }
}
