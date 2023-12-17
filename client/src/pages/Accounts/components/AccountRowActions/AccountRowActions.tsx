/**
 * @fileoverview OperatorRowActions component implementation
 *
 * This file contains OperatorRowActions component implementation.
 *
 * @module OperatorRowActions
 * 
 * @author xbarza00
 */
import {AccountType} from '../../../../utils/axios'
import icons from '../../../../utils/icons'

import classes from "./AccountRowActions.module.css"

//components
import { FloatingDelayGroup } from '@floating-ui/react'
import Popover from '../../../../components/Popover/Popover'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

type PropsType = {
    operatorName: string,
    account: AccountType
}

/**
 * OperatorRowActions component. This component 
 * generates actions (buttons) in the operators table.
 * 
 * @param props - Component props.
 * @param props.data - Component data.
 * @returns OperatorRowActions component
 */
const AccountRowActions = ({
    operatorName,
    account
}: PropsType) => {

    // render component
    // with actions
    return (
        <div className={classes.actions}>
            <FloatingDelayGroup delay={150}>
                <Popover element={
                    <Link to={`/operators/${operatorName}/accounts/${account.name}`}>
                        <Icon
                            width={20}
                            height={20}
                            icon={icons.open}
                            className={classes.actionIcon}
                        />
                    </Link>
                }>
                    Describe
                </Popover>
            </FloatingDelayGroup>
        </div>
    )
}

export default AccountRowActions
