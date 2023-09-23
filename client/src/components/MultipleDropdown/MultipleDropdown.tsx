/**
 * @fileoverview MultipleDropdown component implementation
 *
 * This file contains implementation of a MultipleDropdown component.
 * It generates selectable dropdown element.
 *
 * @module MultipleDropdown
 * 
 * @author xturyt00
 */
import React, { useCallback } from 'react'
import DismissWindow from '../DismissWindow/DismissWindow'
import Checkbox from '../Checkbox/Checkbox'
import { placements } from '../../utils/common'
import Button from '../Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import classes from "./MultipleDropdown.module.css"

type PropsType = {
    label: string,
    icon?: icons,
    items?: string[]
    values?: string[]
    onChange?: (k: string) => void
}

/**
 * MultipleDropdown component
 * 
 * @param props - Component props 
 * @param props.label - Label text
 * @param props.icon - Icon
 * @param props.items - Dropdown items
 * @param props.values - Selected values
 * @param props.onChange - Callback to change the dropdown
 * @returns MultipleDropdown component
 */
const MultipleDropdown = ({
    label = "",
    icon,
    items = [],
    values = [],
    onChange = (k) => {}
}: PropsType) => {

    const onChangeCheckbox = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.name)
        },
        [onChange]
    )

    return (
        <DismissWindow
            align
            offset={0}
            placement={placements.BOTTOM}
            element={(isActive) =>
                <Button className={classes.button}>
                    {label}
                    {icon && <Icon icon={icon} width={20} height={20} />}
                </Button>}>
            {(setIsActive) =>
                <div className={classes.container}>
                    {items.map(key =>
                        <label key={key} className={classes.input}>
                            <Checkbox name={key} value={values.includes(key)} onChange={onChangeCheckbox} />
                            {key}
                        </label>
                    )}
                </div>
            }
        </DismissWindow>
    )
}

export default MultipleDropdown