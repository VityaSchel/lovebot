import axios, { AxiosError } from 'axios'

export const catchError = (error: AxiosError) => {
  if (error.response) {
    // Request made and server responded
    console.log('error.response: ', error.response)

    if (error.response.status === 400) {
      return {
        status: 'not found'
      }
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log('error.request: ', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('else error: ', error.message)
  }
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
let accessToken = ''

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // to send cookie
})

type getPaymentInfoProps = {
  email: string,
  uuid: any
}

export const getPaymentInfo = async (props: getPaymentInfoProps) => {
  try {
    const { email, uuid } = props

    const { data: paymentInfo } = await api.post(`/payment/${uuid}/set-email`, {
      email
    })

    console.log('paymentInfo', paymentInfo)

    return paymentInfo
  } catch (error: any) {
    catchError(error)
  }
}

type getPaymentDataProps = {
  uuid: any
}

export const getPaymentData = async (props: getPaymentDataProps) => {
  try {
    const { uuid } = props

    const { data: paymentData } = await api.get(`/payment/${uuid}/pay`)

    console.log('paymentData', paymentData)

    return paymentData
  } catch (error: any) {
    catchError(error)
  }
}

type getPaymentAmountProps = {
  uuid: any
}

export const getPaymentAmount = async (props: getPaymentAmountProps) => {
  try {
    const { uuid } = props

    const { data: paymentAmount } = await api.get(`/payment/${uuid}`)

    console.log('paymentAmount', paymentAmount)

    return paymentAmount
  } catch (error: any) {
    catchError(error)
  }
}

type paymentUnsubscribeProps = {
  firstNumbers: string,
  lastNumbers: string
}

export const paymentUnsubscribe = async (props: paymentUnsubscribeProps) => {
  try {
    const { firstNumbers, lastNumbers } = props

    const { data: paymentUnsubscribe } = await api.post('/payment/unsubscribe', {
      firstNumbers,
      lastNumbers
    })

    console.log('paymentUnsubscribe', paymentUnsubscribe)

    return paymentUnsubscribe
  } catch (error: any) {
    return catchError(error)
  }
}


type CompanyStatusResponse = {
  id: number
  status: string
}

export async function isCompanyActive(companyID: number): Promise<boolean> {
  try {
    const query = `/advertising_company/${companyID}`
    const response = await api.get(query)
    const data: CompanyStatusResponse = response.data
    if (response.status !== 200) throw new Error('Couldn\'t fetch ' + query)
    return data.status === 'active'
  } catch (error: any) {
    catchError(error)
    return false
  }
}

