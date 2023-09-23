/**
 * @fileoverview OperatorRowActions component implementation
 *
 * This file contains OperatorRowActions component implementation.
 *
 * @module OperatorRowActions
 * 
 * @author xturyt00
 */
import { OperatorType } from '../../../../utils/axios'
import icons from '../../../../utils/icons'

import classes from "./OperatorRowActions.module.css"

//components
import { FloatingDelayGroup } from '@floating-ui/react'
import Popover from '../../../../components/Popover/Popover'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'


type PropsType = {
    operator: OperatorType
}

/**
 * OperatorRowActions component. This component 
 * generates actions (buttons) in the operators table.
 * 
 * @param props - Component props.
 * @param props.data - Component data.
 * @returns OperatorRowActions component
 */
const OperatorRowActions = ({
    operator
}: PropsType) => {

    return (
        <div className={classes.actions}>
            <FloatingDelayGroup delay={150}>
                <Popover element={
                    <Link to={operator.name}>
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

export default OperatorRowActions
