import React from 'react'
import Modal from '../../../../../../components/Modal/Modal'
import icons from '../../../../../../utils/icons'
import { DataFlowType } from '../../../../../../utils/axios'
import useNats from '../../../../../../hooks/useNats'
import MessageBox from '../../../../../DataFlow/components/MessageBox'
import uuid from 'react-uuid'
import classes from './DataflowViewModal.module.css'

type PropsType = {
    data: DataFlowType
    onClose: () => void
}

const DataflowViewModal = ({
    data,
    onClose
}: PropsType) => {

    const { messages, isOwn, publish } = useNats([data.server])

    return (
        <Modal
            title={data.name}
            textProceed='Done'
            textCancel='Cancel'
            icon={icons.chat}
            onClose={onClose}
            onSubmit={onClose}>
            <div className={classes.container}>
                {messages.length === 0 && (
                    <p className={classes.empty}>No messages received...</p>
                )}
                {messages.map(message => (
                    <MessageBox
                        key={uuid()}
                        message={message}
                        isOwn={isOwn(message)}
                    />
                ))}
            </div>
        </Modal>
    )
}

export default DataflowViewModal