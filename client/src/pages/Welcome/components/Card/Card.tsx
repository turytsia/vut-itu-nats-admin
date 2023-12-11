import React from 'react'
import classes from "./Card.module.css"
import icons from '../../../../utils/icons'
import Info from "./components/Info/Info"
import { NSCBaseType } from '../../../../utils/axios'
import { dateFormat } from '../../../../utils/common'
import BaseCard from "../BaseCard/BaseCard"

type PropsType = {
    data: NSCBaseType
    icon: icons
}

const Card = ({
    data,
    icon
}: PropsType) => {
    return (
        <BaseCard
            icon={icon}
            name={data.name}
            to={''}>
            <Info title='Subject ID' value={data.sub} isCopy />
            <Info title='Issuer ID' value={data.iss} isCopy />
            <Info title='Issued' value={dateFormat(data.iat)}  />
        </BaseCard>
    )
}

export default Card