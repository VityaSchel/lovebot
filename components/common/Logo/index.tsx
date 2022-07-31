import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { ReactComponent as Logo } from './logo.svg'

LogoComponent.propTypes = {
  importedLogo: PropTypes.node,
}
interface LogoProps {
  importedLogo?: React.ReactNode // https://github.com/gregberge/svgr/issues/150#issuecomment-1133658639
}
export default function LogoComponent(props: LogoProps) {
  return (
    <div className={styles.logo}>
      {props.importedLogo ?? <Logo /> }
    </div>
  )
}