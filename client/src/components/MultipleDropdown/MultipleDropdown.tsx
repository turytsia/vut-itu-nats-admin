import React, { ChangeEventHandler, useCallback } from 'react'
import DismissWindow from '../DismissWindow/DismissWindow'
import { placements } from '../../utils/common'
import Button from '../Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'

import classes from "./MultipleDropdown.module.css"
import Checkbox from '../Checkbox/Checkbox'

type PropsType = {
    label: string,
    icon?: icons,
    items?: string[]
    values?: string[]
    onChange?: (k: string) => void
}

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