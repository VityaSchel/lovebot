import React from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'

interface HeadingProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  children: React.ReactNode
  className?: string
  center?: boolean
}

export default function Heading(props: HeadingProps) {
  return (
    <props.variant className={cx(styles.heading, { [styles.center]: props.center }, props.className)}>
      {props.children}
    </props.variant>
  )
}
