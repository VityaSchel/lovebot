import '../styles/globals.scss'
import '%/components/common/PageLoadingProgressBar/styles.scss'

import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import { store } from '%/store'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import createEmotionCache from '%/components/common/MUITheme/emotionCache'
import theme from '%/components/common/MUITheme'
import PageLoadingProgressBar from '%/components/common/PageLoadingProgressBar'

const clientSideEmotionCache = createEmotionCache()

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageLoadingProgressBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}

export default appWithTranslation(App)
