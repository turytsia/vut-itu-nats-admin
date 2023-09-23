/**
 * @fileoverview Checkbox component implementation
 *
 * This file contains implementation of a Checkbox component.
 * Checkbox is a common component in the application.
 *
 * @module Checkbox
 * 
 * @author xturyt00
 */
import { ChangeEventHandler, useContext } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import InputContainer from '../InputContainer/InputContainer'
import classNames from 'classnames'
import classes from "./Checkbox.module.css"

type PropsType = {
    labelText?: string
    hintText?: string
    isRequired?: boolean
    name?: string
    value?: any
    onChange?: ChangeEventHandler<HTMLInputElement>
}

/**
 * Checkbox component
 * 
 * @param props - Component props
 * @param props.labelText - Label text
 * @param props.hintText - Tooltip text
 * @param props.isRequired - Set checkbox to be required field (default = false)
 * @param props.name - Name
 * @param props.value - Value
 * @param props.onChange - Callback to change the checkbox
 * @returns Checkbox component
 */
const Checkbox = ({
    labelText = "",
    hintText = "",
    isRequired = false,
    name = "",
    value = "",
    onChange = () => { },
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const inputStyles = classNames(classes.input, { [classes.dark]: isDark })

    return (
        <InputContainer
            isFlex
            labelText={labelText}
            hintText={hintText}
            isRequired={isRequired}>
            <input
                id={inputStyles}
                className={inputStyles}
                name={name}
                type='checkbox'
                onChange={onChange}
                checked={value} />
        </InputContainer>
    )
}

export default Checkbox