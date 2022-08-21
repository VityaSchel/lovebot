const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
const dataPolicy = process.env.NEXT_PUBLIC_DATA_POLICY
const tarifes = process.env.NEXT_PUBLIC_TARIFES
const userAgreement = process.env.NEXT_PUBLIC_USER_AGREEMENT
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL

console.log('baseURL', baseURL)
console.log('dataPolicy', dataPolicy)
console.log('tarifes', tarifes)
console.log('userAgreement', userAgreement)
console.log('contactEmail', contactEmail)

export const configLinks = {
  baseURL,
  dataPolicy,
  tarifes,
  userAgreement,
  contactEmail
}