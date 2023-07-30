/**
 * @fileoverview Dropdown implementation
 *
 * This file contains implementation of a Dropdown. This component is
 * inherited from DismissWindow and widen its implementation into Dropdown.
 *
 * @module storage
 * 
 * @author xturyt00
 */


import { useContext, useMemo } from 'react'

import DismissWindow from "../DismissWindow/DismissWindow"
import { placements } from '../../utils/common'

import classes from "./Dropdown.module.css"
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import classNames from 'classnames'
import { AppContext } from '../../context/AppContextProvider'

/** Dropdown item type */
export type DropdownItemType = {
    id: string,
    value: string
}

/** Component props type */
type PropsType = {
    value: string
    items: DropdownItemType[]
    name?: string
    label?: string
    onChange: (value: string, name: string) => void
}

/**
 * Dropdown component, generates dropdown element on the page
 * 
 * @param props component props
 * @returns Dropdown component
 */
const Dropdown = ({
    label = "",
    value,
    items,
    name = "",
    onChange
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const currentValue = useMemo(
        () => items.find(({ id }) => id === value)?.value,
        [value]
    )

    const dropdownStyles = classNames(classes.dropdown, { [classes.dark]: isDark })

    const itemStyles = classNames(classes.item, { [classes.dark]: isDark })


    return (
        <DismissWindow
            align
            offset={0}
            placement={placements.BOTTOM}
            element={(isActive) =>
                <button className={dropdownStyles}>
                    {label && <span className={classes.label}>{label}</span>}
                    {currentValue ?? "--"}
                    <Icon icon={isActive ? icons.arrowUp : icons.arrowDown} height={20} width={20} />
                </button>}>
            {(setIsActive) =>
                <div className={classes.container}>
                    {items.map(({ id, value }) => (
                        <button key={id} className={itemStyles} onClick={() => { setIsActive(false); onChange(id, name) }}>
                            {value}
                        </button>
                    ))}
                </div>}
        </DismissWindow>
    )
}

export default Dropdown