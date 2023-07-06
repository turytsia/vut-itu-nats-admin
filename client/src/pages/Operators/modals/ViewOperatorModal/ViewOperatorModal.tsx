import React from 'react'
import Modal from '../../../../components/Modal/Modal'
import icons from '../../../../utils/icons'
import { OperatorType } from '../../../../utils/axios'

type PropsType = {
    operator: OperatorType
    onClose: () => void
}

const ViewOperatorModal = ({
    operator,
    onClose
}: PropsType) => {
    return (
        <Modal
            title={"Operator: " + operator.name}
            textProceed='Done'
            textCancel='Cancel'
            icon={icons.eye}
            onClose={onClose}
            onSubmit={onClose}>
            1234
            {/* <Input
                disabled
                isFlex
                isCopy
                value={token}
                renderLeft={"Token"}
                width='70%' /> */}
        </Modal>
    )
}

export default ViewOperatorModal