import React, { useState } from 'react'
import BaseCard from "../BaseCard/BaseCard"
import icons from '../../../../utils/icons'
import { DataFlowType } from '../../../../utils/axios'
import Button from '../../../../components/Button/Button'
import { Icon } from '@iconify/react'

import DataflowViewModal from "./modals/DataflowViewModal/DataflowViewModal"
import Info from '../Card/components/Info/Info'
import { datetimeFormat } from '../../../../utils/common'

type PropsType = {
    icon: icons
    data: DataFlowType
}

const DataflowCard = ({
    icon,
    data,
}: PropsType) => {
    const [isViewActive, setIsViewActive] = useState<boolean>(false)
    // console.log(data)
    return (
        <BaseCard
            icon={icon}
            name={data.name}
            to="/dataflows"
            actions={
                <>
                    <Button onClick={() => setIsViewActive(true)}>
                        <Icon icon={icons.eye} height={20} width={20} />
                    </Button>
                </>
            }
        >
            {data.created && <Info title='Issued' value={datetimeFormat(data.created)} />}
            {isViewActive && (
                <DataflowViewModal data={data} onClose={() => setIsViewActive(false)} />
            )}
        </BaseCard>
    )
}

export default DataflowCard