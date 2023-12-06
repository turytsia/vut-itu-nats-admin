/**
 * @fileoverview Attribute component implementation
 *
 * This file contains implementation of a Attribute component. 
 * It is generated at the Details component.
 *
 * @module Attribute
 * 
 * @author xturyt00
 */
import { useContext, useState } from 'react'
import SecretModal from "../../modals/SecretModal/SecretModal"
import Button from '../../../Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import classes from "./Attribute.module.css"
import { AppContext } from '../../../../context/AppContextProvider'
import classNames from 'classnames'

export type DetailsConfigAttributeType = {
    name?: string,
    value?: any,
    isSecret?: boolean
}

type PropsType = {
    attributeConfig: DetailsConfigAttributeType
}

/**
 * Attribute component
 * 
 * TODO implement modal window
 * 
 * @param props - Component props
 * @param props.attributeConfig - attributeConfig
 * @returns Attribute component
 */
const Attribute = ({
    attributeConfig
}: PropsType) => {
    const { isDark } = useContext(AppContext)
    const [isSecretActive, setIsSecretActive] = useState<boolean>(false)

    const { name, value, isSecret } = attributeConfig

    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })

    const labelStyles = classNames(classes.label, {
        [classes.dark]: isDark
    })

    const valueStyles = classNames(classes.value, {
        [classes.dark]: isDark
    })

    if (!name || !value) return null

    if (isSecret) {
        return (
            <div className={containerStyles}>
                <p className={labelStyles}>{attributeConfig.name}</p>
                <Button className={classes.button} onClick={() => setIsSecretActive(true)}>
                    View
                    <Icon icon={icons.eye} height={20} width={20} />
                </Button>
                {isSecretActive && (
                    <SecretModal
                        name={attributeConfig.name as string}
                        secret={attributeConfig.value}
                        onClose={() => setIsSecretActive(false)}
                    />
                )}
            </div>
        )
    }

    return (
        <div className={containerStyles}>
            <p className={labelStyles}>{attributeConfig.name}</p>
            <div className={valueStyles}>{attributeConfig.value}</div>
        </div>
    )
}

export default Attribute
