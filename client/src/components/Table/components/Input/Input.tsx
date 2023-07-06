/**
 * @fileoverview Input implementation
 *
 * This file contains implementation of an Input. This component
 * is being used as a search input to filter data in the table.
 * There is also a dropdown which specifies which column is going
 * to be filtered
 *
 * @module Input
 * 
 * @author xturyt00
 */

import React, { useCallback, useContext } from 'react'
import Dropdown, { DropdownItemType } from "../../../Dropdown/Dropdown"

import classes from "./Input.module.css"
import { AppContext } from '../../../../context/AppContextProvider'
import classNames from 'classnames'

/** Component props type */
type PropsType = {
    value: string
    dropdownValue: string
    dropdownItems: DropdownItemType[]
    onChange: (inputValue: string, dropdownValue: string) => void
}

/**
 * Input component, renders search input with dropdown in
 * order to filter table at Table.tsx
 * 
 * @param props Component props
 * @returns Input component
 */
const Input = ({
    value: inputValue,
    onChange,
    dropdownValue,
    dropdownItems,
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    /**
     * Input change handler
     * 
     * @param e event
     */
    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value, dropdownValue)
        },
        []
    )

    /**
     * Dropdown change handler
     * 
     * @param value id of the selected item in dropdown
     */
    const onDropdownChange = useCallback(
        (value: string) => {
            onChange(inputValue, value)
        },
        []
    )

    const inputStyles = classNames(classes.input, { [classes.dark]: isDark })

    return (
        <div className={classes.container}>
            <input className={inputStyles} value={inputValue} onChange={onInputChange} placeholder='Search...' />
            <Dropdown items={dropdownItems} value={dropdownValue} onChange={onDropdownChange} />
        </div>
    )
}

export default Input