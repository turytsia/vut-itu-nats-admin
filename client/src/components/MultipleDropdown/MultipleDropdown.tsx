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
import React, { useCallback, useContext } from 'react'
import DismissWindow from '../DismissWindow/DismissWindow'
import Checkbox from '../Checkbox/Checkbox'
import { placements } from '../../utils/common'
import Button from '../Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import classes from "./MultipleDropdown.module.css"
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'

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

    const { isDark } = useContext(AppContext)

    const onChangeCheckbox = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.name)
        },
        [onChange]
    )

    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })

    const inputStyles = classNames(classes.input, {
        [classes.dark]: isDark
    })

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
                <div className={containerStyles}>
                    {items.map(key =>
                        <label key={key} className={inputStyles}>
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