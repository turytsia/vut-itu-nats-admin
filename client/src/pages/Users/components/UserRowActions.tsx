/**
 * @fileoverview UserRowActions component implementation
 *
 * This file contains UserRowActions component implementation.
 *
 * @module UserRowActions
 * 
 * @author xzhuka01
 */
import { UserType, AccountType } from '../../../utils/axios'
import icons from '../../../utils/icons'

import classes from "./UserRowActions.module.css"

//components
import { FloatingDelayGroup } from '@floating-ui/react'
import Popover from '../../../components/Popover/Popover'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { ExtendedUserType } from '../Users'


type PropsType = {
    user: ExtendedUserType
}

/**
 * UserRowActions component. This component 
 * generates actions (buttons) in the users table.
 * 
 * @param props - Component props.
 * @param props.data - Component data.
 * @returns UserRowActions component
 */
const UserRowActions = ({
    user
}: PropsType) => {
console.log(user)
    return (
        <div className={classes.actions}>
            <FloatingDelayGroup delay={150}>
                <Popover element={
                    <Link to={`/operators/${user.operator}/accounts/${user.account}/users/${user.name}`}>
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

export default UserRowActions
