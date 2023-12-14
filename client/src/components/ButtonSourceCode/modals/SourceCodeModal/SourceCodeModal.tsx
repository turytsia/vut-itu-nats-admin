import React, { useContext } from 'react'
import Modal from '../../../Modal/Modal'
import icons from '../../../../utils/icons'

import classes from "./SourceCodeModal.module.css"
import classNames from 'classnames'
import { AppContext } from '../../../../context/AppContextProvider'

type PropsType = {
    data: string
    onClose: () => void
}

const SourceCodeModal = ({
    data,
    onClose
}: PropsType) => {
    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })

    return (
        <Modal
            title="JSON"
            textProceed='Done'
            textCancel='Cancel'
            icon={icons.code}
            onClose={onClose}
            onSubmit={onClose}>
            <pre className={containerStyles}>{data}</pre>
        </Modal>
    )
}

export default SourceCodeModal