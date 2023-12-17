/**
 * @fileOverview JWT Modal Component.
 *
 * @exports JWTModal
 *
 * @version 1.0.0
 *
 * @author xbarza00
 */

import React from 'react'
import Modal from '../../../../components/Modal/Modal'
import Input from '../../../../components/Input/Input'
import icons from '../../../../utils/icons'

type PropsType = {
    token: string
    onClose: () => void
}

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