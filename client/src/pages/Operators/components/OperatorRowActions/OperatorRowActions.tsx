import { FloatingDelayGroup } from '@floating-ui/react'
import Popover from '../../../../components/Popover/Popover'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

import { OperatorType } from '../../../../utils/axios'
import icons from '../../../../utils/icons'
import classes from "./OperatorRowActions.module.css"

type PropsType = {
    data: OperatorType
}

/**
 * 
 * @param param0 
 * @returns 
 */
const OperatorRowActions = ({
    data
}: PropsType) => {

    return (
        <div className={classes.actions}>
            <FloatingDelayGroup delay={150}>
                <Popover element={
                    <Link to={data.name}>
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
