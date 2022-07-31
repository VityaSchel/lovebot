import { store } from '%/store/index'
import { setTheme } from '%/store/reducers/theme'

export default function defaultInvoke() {
  const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  store.dispatch(setTheme({ theme: prefersDarkTheme ? 'dark' : 'light' }))
}