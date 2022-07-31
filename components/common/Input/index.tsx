import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { useFormikContext } from 'formik'
import { BsExclamationCircle } from 'react-icons/bs'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string | undefined
  center?: boolean
}

export default function Input({
  className,
  inputClassName,
  center,
  type = 'text',
  value,
  onChange,
  ...restProps
}: InputProps) {
  const [inputValue, setInputValue] = useState(value)

  const formikContext = useFormikContext()
  let errors: { [key: string]: string } = {}
  let touched: { [key: string]: string } = {}
  if(formikContext) {
    errors = formikContext.errors
    touched = formikContext.touched
  }
  const fieldID = restProps['name'] ?? ''
  const error = touched[fieldID] ? errors[fieldID] : undefined
  const [errorMessage, setErrorMessage] = React.useState('')

  React.useEffect(() => {
    if (error !== undefined) {
      setErrorMessage(error)
    } else {
      const timeoutID = setTimeout(() => setErrorMessage(error), 200)
      return () => clearTimeout(timeoutID)
    }
  }, [error, setErrorMessage])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { maxLength } = event.target
    let newValue: string | number = event.target.value

    if (maxLength > 0) {
      newValue = newValue.slice(0, maxLength)
    }

    setInputValue(newValue)

    if (onChange) {
      onChange(event)
    }
  }

  return (
    <div className={cn(styles.inputContainer, className)}>
      <input
        {...restProps}
        type={type}
        className={cn(styles.input, inputClassName, { 
          [styles.inputCenter]: center,
          [styles.invalid]: error !== undefined
        })}
        value={inputValue}
        onChange={handleChange}
      />
      <div className={cn(styles.error, {
        [styles.visible]: error !== undefined
      })}><BsExclamationCircle /> {errorMessage}</div>
    </div>
  )
}
