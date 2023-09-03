import React, { useState } from 'react'

import classes from "./Attribute.module.css"
import JWTModal from '../../../../pages/OperatorsDetail/modals/JWTModal/JWTModal'
import Button from '../../../Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'

export type DetailsConfigAttributeType = {
    name?: string,
    value?: any,
    isSecret?: boolean
}

type PropsType = {
    attributeConfig: DetailsConfigAttributeType
}

const Attribute = ({
    attributeConfig
}: PropsType) => {
    const [isSecretActive, setIsSecretActive] = useState<boolean>(false)

    const { name, value, isSecret } = attributeConfig

    if (!name || !value) return null

    if (isSecret) {
        return (
            <div className={classes.container}>
                <p className={classes.label}>{attributeConfig.name}</p>
                <Button className={classes.button} onClick={() => setIsSecretActive(true)} isTransparent>
                    View
                    <Icon icon={icons.eye} height={20} width={20} />
                </Button>
                {isSecretActive && <JWTModal token={attributeConfig.value} onClose={() => setIsSecretActive(false)} />}
            </div>
        )
    }

    return (
        <div className={classes.container}>
            <p className={classes.label}>{attributeConfig.name}</p>
            <div className={classes.value}>{attributeConfig.value}</div>
        </div>
    )
}

export default Attribute
