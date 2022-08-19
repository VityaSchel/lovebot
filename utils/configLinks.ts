const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.loverbot.xyz'
const data_policy = process.env.NEXT_DATA_POLICY || 'https://api.loverbot.xyz'
const tarifes = process.env.NEXT_TARIFES || 'https://api.loverbot.xyz'
const user_agreement = process.env.NEXT_USER_AGREEMENT || 'https://api.loverbot.xyz'

export const configLinks = {
  baseURL,
  data_policy,
  tarifes,
  user_agreement
}
