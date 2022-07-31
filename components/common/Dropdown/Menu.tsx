import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import cx from 'classnames'
import ButtonBase from '@mui/material/ButtonBase'
// import ClickAwayListener from '@mui/material/ClickAwayListener'

Menu.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  // onCancel: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
}

interface MenuProps {
  values: React.ReactNode[]
  onSelect: (selectedIndex: number) => void
  // onCancel?: () => void
  visible: boolean
  className?: string | string[]
}

export default function Menu({ values, onSelect, visible, ...props }: MenuProps) {
  return (
    <div className={cx(styles.menu, props.className, { [styles.visible]: visible })}>
      {values/*.filter(option => option !== values[index])*/.map((option, i) => (
        <ButtonBase className={styles.option} key={i} onClick={() => onSelect(i)}>
          {option}
        </ButtonBase>
      ))}
    </div>
  )
}