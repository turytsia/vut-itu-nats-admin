/**
 * @author xturyt00
 */
import React from 'react'
import classes from "./Card.module.css"
import icons from '../../../../utils/icons'
import Info from "./components/Info/Info"
import { AccountType, NSCBaseType, OperatorType, UserType } from '../../../../utils/axios'
import { SecondsToMs, dateFormat, datetimeFormat } from '../../../../utils/common'
import BaseCard from "../BaseCard/BaseCard"
import { ExtendedAccountType } from '../../../Accounts/Accounts'
import { ExtendedUserType } from '../../../Users/Users'
import ButtonSourceCode from "../../../../components/ButtonSourceCode/ButtonSourceCode"

type NSCEntityType = OperatorType | ExtendedAccountType | ExtendedUserType

/**
 * Card component props
 *
 * @typedef {object} PropsType
 */
type PropsType = {
    data: NSCEntityType
    icon: icons,
    type: "operator" | "account" | "user"
}

/**
 * Card component
 *
 * @param data - Card data
 * @param icon - Icon name
 * @param type - Card type
 * @constructor
 */
const Card = ({
    data,
    icon,
    type
}: PropsType) => {

    /**
     * Hooks not needed
     */

    /**
     * Functions
     */

    // get to
    // used for link to
    const getTo = () => {
        switch (type) {
            case "operator":
                return `/operators/${(data as OperatorType).name}`
            case "account":
                return `/operators/${(data as ExtendedAccountType).operator}/accounts/${(data as ExtendedAccountType).name}`
            case "user":
                return `/operators/${(data as ExtendedUserType).operator}/accounts/${(data as ExtendedUserType).account}/users/${(data as ExtendedUserType).name}`
        }
    }

    // render
    return (
        <BaseCard
            icon={icon}
            name={data.name}
            to={getTo()}
            actions={ 
                <>
                    <ButtonSourceCode data={data} />
                </>
            }>
            <Info title='Subject ID' value={data.sub} isCopy />
            <Info title='Issuer ID' value={data.iss} isCopy />
            <Info title='Issued' value={datetimeFormat(SecondsToMs(data.iat))}  />
        </BaseCard>
    )
}

export default Card