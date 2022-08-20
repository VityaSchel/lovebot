const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
const data_policy = process.env.NEXT_DATA_POLICY
const tarifes = process.env.NEXT_TARIFES
const user_agreement = process.env.NEXT_USER_AGREEMENT

export const configLinks = {
  baseURL,
  data_policy,
  tarifes,
  user_agreement
}
