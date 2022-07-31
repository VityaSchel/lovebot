import React from 'react'
import themeDetector from './themeDetector'

export default function Deferred() {

  React.useEffect(() => {
    // add all loaders here
    themeDetector()
  }, [])

  return (
    <></>
  )
}
