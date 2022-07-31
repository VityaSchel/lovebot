import React from 'react'
import styles from './styles.module.scss'

export default function Loading() {
  const [loaded, setLoaded] = React.useState(false)
  const [loadedTransitionApplied, setLoadedTransitionApplied] = React.useState(false)

  React.useEffect(() => {
    setLoadedTransitionApplied(true)
  }, [setLoadedTransitionApplied])

  return (
    <div className={styles.loading} style={{ opacity: loadedTransitionApplied ? 0 : 1 }} />
  )
}