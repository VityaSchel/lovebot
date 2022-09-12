const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
const dataPolicy = process.env.NEXT_PUBLIC_DATA_POLICY
const tariffs = process.env.NEXT_PUBLIC_TARIFFS
const userAgreement = process.env.NEXT_PUBLIC_USER_AGREEMENT
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL
const botLink = process.env.NEXT_PUBLIC_BOT_LINK
const redirectAfterPayment = process.env.NEXT_PUBLIC_REDIRECT_AFTER_PAYMENT
const textSecondCheckbox = process.env.NEXT_PUBLIC_TEXT_SECOND_CHECKBOX
const mainPageTextSubscriptionPrices = process.env.NEXT_PUBLIC_MAIN_PAGE_TEXT_SUBSCRIPTION_PRICES
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME
const companyInn = process.env.NEXT_PUBLIC_COMPANY_INN
const companyOgrnip = process.env.NEXT_PUBLIC_COMPANY_OGRNIP

console.log('baseURL', baseURL)
console.log('dataPolicy', dataPolicy)
console.log('tariffs', tariffs)
console.log('userAgreement', userAgreement)
console.log('contactEmail', contactEmail)
console.log('botLink', botLink)
console.log('redirectAfterPayment', redirectAfterPayment)
console.log('textSecondCheckbox', textSecondCheckbox)
console.log('mainPageTextSubscriptionPrices', mainPageTextSubscriptionPrices)
console.log('companyName', companyName)
console.log('companyName', companyInn)
console.log('companyOgrnip', companyOgrnip)

export const config = {
  baseURL,
  dataPolicy,
  tariffs,
  userAgreement,
  contactEmail,
  botLink,
  redirectAfterPayment,
  textSecondCheckbox,
  mainPageTextSubscriptionPrices,
  companyName,
  companyInn,
  companyOgrnip
}