import React, { useMemo } from 'react'
import classNames from 'classnames'
import Popover from '../Popover/Popover'

import classes from "./InputContainer.module.css"
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'

type PropsType = {
    children: React.ReactNode
    isFlex?: boolean
    renderLeft?: React.ReactNode
    width?: string
    hintText?: string
    labelText?: string
    isRequired?: boolean
    error?: string
}

const InputContainer = ({
    children,
    isFlex = false,
    renderLeft,
    width,
    hintText = "",
    labelText = "",
    isRequired = false,
    error = ""
}: PropsType) => {

    const containerStyles = useMemo(
        () => classNames(classes.container, { [classes.flex]: isFlex }),
        [isFlex]
    )

    return (
        <div className={containerStyles}>
            {renderLeft}
            <label className={classes.label} htmlFor={classes.input}>
                {labelText}
                {isRequired && <span className={classes.required}>*</span>}
                {hintText && <Popover element={<span className={classes.hint}>(?)</span>}>{hintText}</Popover>}
            </label>
            <div className={classes.inputContainer} style={{ width }}>
                {children}
                <div className={classes.errorContainer}>
                    {error && <p className={classes.error}><Icon icon={icons.error} height={20} width={20} /> {error}</p>}
                </div>
            </div>
        </div>
    )
}

export default InputContainer