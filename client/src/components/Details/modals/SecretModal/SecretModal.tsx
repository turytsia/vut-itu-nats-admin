import React from 'react'
import Modal from '../../../Modal/Modal'
import icons from '../../../../utils/icons'
import Input from '../../../Input/Input'

type PropsType = {
    name: string
    secret: string
    onClose: () => void
}

const SecretModal = ({
    name,
    secret,
    onClose
}: PropsType) => {
  return (
      <Modal
          title="Secret"
          textProceed='Done'
          textCancel='Cancel'
          icon={icons.lock}
          onClose={onClose}
          onSubmit={onClose}>
          <Input
              disabled
              isFlex
              isCopy
              value={secret}
              renderLeft={name}
              width='70%' />
      </Modal>
  )
}

export default SecretModal