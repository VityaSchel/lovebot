import NextNProgress from 'nextjs-progressbar'

export default function PageLoadingProgressBar() {
  return (
    <NextNProgress
      color='#F88F32' // box-shadow color
      // actual color is specified in ./styles.scss
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
      options={{ 
        easing: 'ease', 
        speed: 500,
        showSpinner: true
      }}
    />
  )
}