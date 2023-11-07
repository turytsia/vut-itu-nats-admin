/**
 * @fileoverview Select component implementation
 *
 * @module Select
 *
 * @author xbarza00
 */
import React, {useContext, ChangeEventHandler} from 'react'
import {AppContext} from '../../context/AppContextProvider'
import classNames from 'classnames'
import classes from "./Select.module.css"

type PropsType = {
    options: string[] | { value: string, label: string }[]
    className?: string
    disabled?: boolean
    name: string
    children?: React.ReactNode
    onChange?: ChangeEventHandler<HTMLSelectElement>
}

/**
 * Button component
 *
 * @param props - Component props
 * @param props.className - additional classes for select
 * @param props.disabled - flag if true then the select is disabled
 * @param props.onChange - Callback on change the select
 * @returns Button component
 */
const Select = (
    {
        name,
        options = [],
        className = "",
        disabled = false,
        onChange = () => {
        }
    }: PropsType
) => {

    const {isDark} = useContext(AppContext)

    const selectStyles = classNames(classes.select, className, {
        [classes.dark]: isDark,
    })

    const selectOptions = () => {
        console.log(options)
        if (typeof options[0] === "string") {
            options = options as string[]
            return options.map((option) => {
                return <option value={option}>{option}</option>
            })
        }
        options = options as { value: string, label: string }[]
        return options.map((option) => {
            return <option value={option.value}>{option.label}</option>
        })
    }

    return (
        <select
            className={selectStyles}
            disabled={disabled}
            onChange={onChange}
            name={name}
        >
            {selectOptions()}
        </select>
    )
}


export default Select