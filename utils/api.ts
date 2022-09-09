import axios, { AxiosError } from 'axios'
import {config} from "%/utils/config";

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

const baseURL = config.baseURL

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // to send cookie
})

type setPaymentEmailProps = {
  email: string,
  uuid: any
}

export const setPaymentEmail = async (props: setPaymentEmailProps) => {
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

    const { data: paymentData } = await api.get(`/payments/${uuid}/pay`)

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

    const { data: paymentAmount } = await api.get(`/payments/${uuid}`)

    console.log('paymentAmount', paymentAmount)

    return paymentAmount
  } catch (error: any) {
    catchError(error)
  }
}

type subscriptionsUnsubscribeProps = {
  firstNumbers: string,
  lastNumbers: string
}

export const subscriptionsUnsubscribe = async (props: subscriptionsUnsubscribeProps) => {
  try {
    const { firstNumbers, lastNumbers } = props

    const { data: subscriptionsUnsubscribe } = await api.post('/subscriptions/unsubscribe', {
      firstNumbers,
      lastNumbers
    })

    console.log('subscriptionsUnsubscribe', subscriptionsUnsubscribe)

    return subscriptionsUnsubscribe
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
    const query = `/advertising_companies/${companyID}`
    const response = await api.get(query)
    const data: CompanyStatusResponse = response.data
    if (response.status !== 200) throw new Error('Couldn\'t fetch ' + query)
    return data.status === 'active'
  } catch (error: any) {
    catchError(error)
    return false
  }
}

