import React, { useState } from 'react'

import icons from "../../../../utils/icons"
import Modal from "../../../../components/Modal/Modal"
import Input from "../../../../components/Input/Input"
import InputTags from "../../../../components/InputTags/InputTags"
import { OperatorType } from '../../../../utils/axios'

type PropsType = {
    onClose: () => void
    onSubmit: () => void
    operator: OperatorType
}

const EditOperatorModal = ({
    onClose,
    onSubmit,
    operator
}: PropsType) => {

    const [tags, setTags] = useState(operator.nats.tags ?? [])

    return (
        <Modal
            title={"Update operator: " + operator.name}
            textProceed='Save'
            textCancel='Cancel'
            icon={icons.pen}
            onClose={onClose}
            onSubmit={onSubmit}>
            <InputTags
                labelText="Tags"
                name='name'
                value={tags}
                onChange={setTags} />
        </Modal>
    )
}

export default EditOperatorModal