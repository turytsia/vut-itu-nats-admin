import React, { useState } from 'react'
import BaseCard from "../BaseCard/BaseCard"
import icons from '../../../../utils/icons'
import { DataFlowType } from '../../../../utils/axios'
import Button from '../../../../components/Button/Button'
import { Icon } from '@iconify/react'

import DataflowViewModal from "./modals/DataflowViewModal/DataflowViewModal"

type PropsType = {
    icon: icons
    data: DataFlowType
}

const DataflowCard = ({
    icon,
    data,
}: PropsType) => {
    const [isViewActive, setIsViewActive] = useState<boolean>(false)
    return (
        <BaseCard
            icon={icon}
            name={data.name}
            to={''}
            actions={
                <>
                    <Button onClick={() => setIsViewActive(true)}>
                        View
                        <Icon icon={icons.eye} height={20} width={20} />
                    </Button>
                </>
            }
        >
            <span>123</span>
            {isViewActive && (
                <DataflowViewModal data={data} onClose={() => setIsViewActive(false)} />
            )}
        </BaseCard>
    )
}

export default DataflowCard