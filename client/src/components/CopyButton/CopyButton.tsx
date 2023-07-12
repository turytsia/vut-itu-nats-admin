import React, { useState } from 'react'
import { Icon } from "@iconify/react"
import icons from "../../utils/icons"

import classes from "./CopyButton.module.css"
import classNames from 'classnames'
import Popover from '../Popover/Popover'

type PropsType = {
    className?: string
    value: string
}

const CopyButton = ({
    className = "",
    value,
}: PropsType) => {
    const [isClick, setIsClick] = useState(false)

    const onClick = () => {
        navigator.clipboard.writeText(value)
        setIsClick(true)
    }

    const buttonStyles = classNames(classes.container, className)

    return (
        <button className={buttonStyles} onClick={onClick}>
            {isClick ?
                (<Popover element={<Icon icon={icons.copyCheck} width={20} height={20} />}>Copied!</Popover>) :
                <Icon icon={icons.copy} width={20} height={20} />
            }
        </button>
    )
}

export default CopyButton