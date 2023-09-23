/**
 * @fileoverview DateInput component implementation
 *
 * This file contains implementation of a DateInput component. This is a
 * common date input in the application.
 *
 * @module DateInput
 * 
 * @author xturyt00
 */
import React, { useContext, useMemo } from 'react'
import InputContainer from '../InputContainer/InputContainer'
import DatePicker from 'react-datepicker'

import classes from "./DateInput.module.css"
import { dateFormat } from '../../utils/common'
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'

type PropsType = {
    isRequired?: boolean
    labelText?: string
    value?: any
    disabled?: boolean
    renderLeft?: React.ReactNode
    isFlex?: boolean
    width?: string
    placeholder?: string
    hintText?: string
    name?: string
    onChange?: (value: string, name: string) => void
}

/**
 * DateInput component
 * 
 * @param props - Component props
 * @param props.value - Value
 * @param props.labelText - Label text for the input
 * @param props.placeholder - Placeholder
 * @param props.hintText - Tooltip text
 * @param props.isRequired - Require input (default = false)
 * @param props.disabled - Disable input (default = false)
 * @param props.renderLeft - Render element to the left from the label
 * @param props.isFlex - Flex input
 * @param props.width - Manually set width
 * @param props.name - Input name
 * @param props.onChange - Callback to change the date input
 * @returns DateInput component
 */
const DateInput = ({
    value = "",
    labelText = "",
    placeholder = "",
    hintText = "",
    isRequired = false,
    disabled = false,
    renderLeft,
    isFlex,
    width,
    name,
    onChange = () => { }
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const inputStyles = useMemo(
        () => classNames(classes.input, { [classes.dark]: isDark }),
        [isDark]
    )

  return (
      <InputContainer
          labelText={labelText}
          hintText={hintText}
          isRequired={isRequired}
          renderLeft={renderLeft}
          isFlex={isFlex}
          width={width}
      >
          <DatePicker
              id={inputStyles}
              className={inputStyles}
              placeholderText={placeholder}
              disabled={disabled}
              name={name}
              value={value ? dateFormat(value) : ""}
              onChange={(date) => onChange(date?.toISOString() as string, name as string)} /> 
      </InputContainer>
  )
}

export default DateInput