/**
 * @fileoverview Select component implementation
 *
 * @module Select
 *
 * @author xbarza00
 */
import React, { useContext, ChangeEventHandler } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'
import classes from "./Select.module.css"
import Dropdown, { DropdownItemType } from '../Dropdown/Dropdown'
import InputContainer from '../InputContainer/InputContainer'

type PropsType = {
    isRequired?: boolean
    labelText?: string
    hintText?: string
    isFlex?: boolean
    label?: string
    items: DropdownItemType[]
    value: string | null
    className?: string
    disabled?: boolean
    name: string
    children?: React.ReactNode
    renderLeft?: React.ReactNode
    width?: string
    onChange?: (value: string | null, name?: string) => void
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
const Select = ({
    isRequired,
    labelText,
    hintText,
    label,
    name,
    value,
    items = [],
    className = "",
    disabled = false,
    renderLeft,
    width,
    isFlex,
    onChange = () => { }
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const selectStyles = classNames(classes.select, className, {
        [classes.dark]: isDark,
    })

    // const selectOptions = () => {
    //     console.log(options)
    //     if (typeof options[0] === "string") {
    //         options = options as string[]
    //         return options.map((option) => {
    //             return <option value={option}>{option}</option>
    //         })
    //     }
    //     options = options as { value: string, label: string }[]
    //     return options.map((option) => {
    //         return <option value={option.value}>{option.label}</option>
    //     })
    // }

    return (
        <InputContainer
            labelText={labelText}
            hintText={hintText}
            isRequired={isRequired}
            renderLeft={renderLeft}
            isFlex={isFlex}
            width={width}
        >
        <Dropdown
            
            label={label}
            className={classes.dropdown}
            value={value}
            items={items}
            name={name}
            onChange={onChange}
            />
        </InputContainer>
        // <select
        //     className={selectStyles}
        //     disabled={disabled}
        //     onChange={onChange}
        //     name={name}
        // >
        //     {selectOptions()}
        // </select>
    )
}


export default Select