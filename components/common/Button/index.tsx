import React from 'react'
import PropTypes from 'prop-types'
import MUIButton from '@mui/material/Button'
import styles from './styles.module.scss'
import cx from 'classnames'

Button.propTypes = {
  mode: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.bool,
  buttonProps: PropTypes.object,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  buttonClassNames: PropTypes.arrayOf(PropTypes.string)
}
interface ButtonProps {
  mode?: 'solid' | 'color_stroke' | 'gray_stroke' | 'transparent'
  size?: 'large' | 'medium' | 'small'| 'extra_large'
  icon?: boolean
  disabled?: boolean
  children: React.ReactNode
  buttonProps?: object
  buttonClassNames?: string | string[]
}
function Button(props: ButtonProps) {
  const [pressed, setPressed] = React.useState(false)

  return (
    <div
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerOut={() => setPressed(false)}
      className={cx(styles.buttonContainer, {
        [styles.disabled]: props.disabled
      })}
      button-container=''
    >
      <div
        className={cx(styles.button, {
          [styles.pressed]: pressed,
          [styles.colorStroke]: props.mode === 'color_stroke'
        })}
      >
        <MUIButton
          className={cx(styles.muiButton, props.buttonClassNames, {
            [styles.solid]: props.mode === 'solid',
            [styles.colorStroke]: props.mode === 'color_stroke',
            [styles.grayStroke]: props.mode === 'gray_stroke',
            [styles.transparent]: props.mode === 'transparent',

            [styles.extraLarge]: props.size === 'extra_large',
            [styles.large]: props.size === 'large',
            [styles.medium]: props.size === 'medium',
            [styles.small]: props.size === 'small',

            [styles.icon]: props.icon
          })}
          {...props.buttonProps}
        >
          {props.children}
        </MUIButton>
      </div>
    </div>
  )
}
Button.defaultProps = {
  mode: 'solid',
  size: 'large',
}
export default Button
