import React from 'react'

import Dropdown, { DropdownItemType } from "../../../Dropdown/Dropdown"
import { placements } from '../../../../utils/common'

import classes from "./Input.module.css"

type PropsType = {
    value: string
    onChange: (inputValue: string, dropdownValue: string ) => void
    dropdownValue: string
    dropdownItems: DropdownItemType[]
}

const Input = ({
    value: inputValue,
    onChange,
    dropdownValue,
    dropdownItems
}: PropsType) => {

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value, dropdownValue)
    }

    const onDropdownChange = (value: string) => {
        onChange(inputValue, value)
    }

    return (
        <div className={classes.container}>
            <input className={classes.input} value={inputValue} onChange={onInputChange} placeholder='Search...' />
            <Dropdown items={dropdownItems} value={dropdownValue} onChange={onDropdownChange} />
        </div>
    )
}

export default Input