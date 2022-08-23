const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
const dataPolicy = process.env.NEXT_PUBLIC_DATA_POLICY
const tarifes = process.env.NEXT_PUBLIC_TARIFES
const userAgreement = process.env.NEXT_PUBLIC_USER_AGREEMENT
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL
const botLink = process.env.NEXT_PUBLIC_BOT_LINK
const redirectAfterPayment = process.env.NEXT_PUBLIC_REDIRECT_AFTER_PAYMENT
const textSecondCheckbox = process.env.NEXT_PUBLIC_TEXT_SECOND_CHECKBOX

console.log('baseURL', baseURL)
console.log('dataPolicy', dataPolicy)
console.log('tarifes', tarifes)
console.log('userAgreement', userAgreement)
console.log('contactEmail', contactEmail)
console.log('botLink', botLink)
console.log('redirectAfterPayment', redirectAfterPayment)
console.log('textSecondCheckbox', textSecondCheckbox)

export const configLinks = {
  baseURL,
  dataPolicy,
  tarifes,
  userAgreement,
  contactEmail,
  botLink,
  redirectAfterPayment,
  textSecondCheckbox
}