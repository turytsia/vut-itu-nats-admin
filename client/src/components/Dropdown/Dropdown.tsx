import React, { useCallback, useMemo } from 'react'

import DismissWindow from "../DismissWindow/DismissWindow"
import { placements } from '../../utils/common'

import classes from "./Dropdown.module.css"
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'

export type DropdownItemType = {
    id: string,
    value: string
}

type PropsType = {
    value: string
    items: DropdownItemType[]
    name?: string
    onChange: (value: string, name: string) => void
}

const Dropdown = ({
    value,
    items,
    name = "",
    onChange
}: PropsType) => {

    const currentValue = useMemo(
        () => items.find(({ id }) => id === value)?.value,
        [value]
    )

    return (
        <DismissWindow
            align
            offset={0}
            placement={placements.BOTTOM}
            element={(isActive) =>
                <button className={classes.dropdown}>
                    {currentValue ?? "--"}
                    <Icon icon={isActive ? icons.arrowUp : icons.arrowDown} height={20} width={20} />
                </button>}>
            {(setIsActive) =>
                <div className={classes.container}>
                    {items.map(({ id, value }) => (
                        <button key={id} className={classes.item} onClick={() => { setIsActive(false); onChange(id, name)}}>
                            {value}
                        </button>
                    ))}
                </div>}
        </DismissWindow>
    )
}

export default Dropdown