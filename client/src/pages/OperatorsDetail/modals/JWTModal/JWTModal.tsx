/**
 * @module OpearatorsDetail
 *
 * @author xturyt00
 */
import React from 'react'
import Modal from '../../../../components/Modal/Modal'
import Input from '../../../../components/Input/Input'
import icons from '../../../../utils/icons'

/**
 * Modal form component for editing operators.
 *
 * @param props - Component props.
 */
type PropsType = {
    token: string
    onClose: () => void
}


/**
 * JWTModal component
 * @param token JWT token
 * @param onClose Callback to close the modal.
 * @constructor
 */
const JWTModal = ({
    token,
    onClose,
}: PropsType) => {
    return (
        <Modal
            title="JWT Token"
            textProceed='Done'
            textCancel='Cancel'
            icon={icons.lock}
            onClose={onClose}
            onSubmit={onClose}>
            <Input
                disabled
                isFlex
                isCopy
                value={token}
                renderLeft="Token"
                width='70%' />
        </Modal>
    )
}

export default JWTModal