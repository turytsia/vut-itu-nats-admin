/**
 * @fileoverview Dropdown implementation
 *
 * This file contains implementation of a Dropdown. This component is
 * inherited from DismissWindow and widen its implementation into Dropdown.
 *
 * @module Dropdown
 * 
 * @author xturyt00
 */
import { ChangeEvent, useContext } from 'react'
import DismissWindow from "../DismissWindow/DismissWindow"
import { placements } from '../../utils/common'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import { AppContext } from '../../context/AppContextProvider'
import classes from "./Dropdown.module.css"
import classNames from 'classnames'

export type DropdownItemType = {
    id: string,
    value: string
}

type PropsType = {
    value: string | null
    items: DropdownItemType[]
    name?: string
    label?: string
    onChange: (value: string | null, name: string) => void,
    className?: string
}

/**
 * Dropdown component
 * 
 * @param props - Component props
 * @param props.label - Label text
 * @param props.value - Value
 * @param props.items - Dropdown items
 * @param props.name - Name
 * @param props.onChange - Callback to change the button
 * @param props.className - Classname
 * @returns Dropdown component
 */
const Dropdown = ({
    label = "",
    value,
    items,
    name = "",
    onChange,
    className = ""
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const currentValue = items.find(({ id }) => id === value)?.value

    const dropdownStyles = classNames(classes.dropdown, className, { [classes.dark]: isDark })

    const itemStyles = classNames(classes.item, { [classes.dark]: isDark })

    return (
        <DismissWindow
            align
            offset={0}
            placement={placements.BOTTOM}
            element={(isActive) =>
                <button className={classNames(dropdownStyles, {
                    [classes.active]: isActive
                })}>
                    {label && (
                        <span className={classes.label}>
                            {label}
                        </span>
                    )}
                    {currentValue ?? "--"}
                    <Icon icon={isActive ? icons.arrowUp : icons.arrowDown} height={20} width={20} />
                </button>}>
            {setIsActive => {

                const selectOption = (value: string | null, name: string) => {
                    setIsActive(false)
                    onChange(value, name)
                }

                return (
                    <div className={classes.container}>
                        <button className={itemStyles} onClick={() => selectOption(null, name)}>
                            --
                        </button>
                        {items.map(({ id, value }) => (
                            <button key={id} className={itemStyles} onClick={() => selectOption(id, name)}>
                                {value}
                            </button>
                        ))}
                    </div>
               )
            }}
        </DismissWindow>
    )
}

export default Dropdown