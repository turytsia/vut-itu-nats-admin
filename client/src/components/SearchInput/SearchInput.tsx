/**
 * @fileoverview Input implementation
 *
 * This file contains implementation of an Input. This component
 * is being used as a search input to filter data in the table.
 * There is also a dropdown which specifies which column is going
 * to be filtered
 *
 * @module SearchInput
 * 
 * @author xturyt00
 */

import React, { useContext } from 'react'
import Dropdown, { DropdownItemType } from "../Dropdown/Dropdown"

import classes from "./SearchInput.module.css"
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'

export type SearchInputType = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type SearchInputDropdownType = {
    value: string
    items: DropdownItemType[],
    onChange: (v: string) => void
}

export type SearchInputConfigType = {
    input: SearchInputType,
    dropdown?: SearchInputDropdownType
}

type PropsType = {
    searchConfig: SearchInputConfigType
}

/**
 * SearchInput component, renders search input with dropdown in
 * order to filter table at Table.tsx
 * 
 * @param props Component props
 * @param props.searchConfig - Search config
 * @returns SearchInput component
 */
const SearchInput = ({
    searchConfig
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const inputStyles = classNames(classes.input, { [classes.dark]: isDark })

    return (
        <div className={classes.container}>
            <input
                className={inputStyles}
                value={searchConfig.input.value}
                onChange={searchConfig.input.onChange}
                placeholder='Search...'
            />
            {searchConfig.dropdown && (
                <Dropdown
                    label='Search by'
                    items={searchConfig.dropdown.items}
                    value={searchConfig.dropdown.value}
                    onChange={searchConfig.dropdown.onChange}
                />)}
        </div>
    )
}

export default SearchInput
