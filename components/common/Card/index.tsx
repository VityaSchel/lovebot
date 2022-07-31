import React from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'

export default function Card({ children, className, ...props }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cx(styles.container, className)} {...props}>
      {children}
    </div>
  )
}