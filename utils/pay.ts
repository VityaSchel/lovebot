import Cookies from 'js-cookie'

type payProps = {
  cloudpayments: any,
  onSuccess: any
}

export function pay(props: payProps) {
    try {

        console.log('click pay');

        const widget = new cp.CloudPayments()

        const { cloudpayments, onSuccess } = props

        widget.pay(
            'charge', // auth или charge
            cloudpayments,
            {
                onSuccess: function(options: any) {
                    // действие при успешной оплате
                    // onSuccess()
                    console.log('cloudpayments success')
                },
                onFail: function(reason: any, options: any) {
                    // действие при неуспешной оплате
                    console.log('cloudpayments fail: ', reason)
                },
                onComplete: function(paymentResult: any, options: any) {
                    //  Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                    // Например, вызов вашей аналитики
                    console.log('cloudpayments complete: ', paymentResult)
                    Cookies.delete('visited')
                }
            }
        )
    } catch (error: any) {
        console.log('cloudpayments error: ', error)
    }
}
