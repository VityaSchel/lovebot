import React from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'
import { ReactComponent as Checkmark } from './Checkbox.svg'

interface CheckboxProps {
  id: string
  children: React.ReactNode
  value: boolean
  disabled: boolean
  onChange: (value: boolean) => void
  inputProps?: object
  className?: string | string[]
  longLabel: boolean
}

export default function Checkbox(props: CheckboxProps) {
  let [checked, setChecked] = React.useState(false)

  if (props.value) checked = props.value
  if (props.onChange) setChecked = props.onChange

  return (
    <div className={cx(styles.container, props.className, {
      [styles.disabled]: props.disabled
    })}>
      <div className={styles.innerContainer}>
        <input 
          type="checkbox" 
          id={props.id} 
          checked={checked}
          onChange={event => setChecked(event.target.checked)}
          disabled={props.disabled}
          {...props.inputProps}
        />
        <label htmlFor={props.id} className={cx({ [styles.longLabel]: props.longLabel })}>{props.children}</label>
        <div
          className={styles.checkmarkContainer}
          onClick={() => setChecked(!checked)}
        >
          <div className={styles.checkmarkInner}>
            <Checkmark />
          </div>
        </div>
      </div>
    </div>
  )
}

Checkbox.defaultProps = {
  longLabel: false 
}