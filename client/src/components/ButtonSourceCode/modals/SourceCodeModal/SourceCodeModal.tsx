/**
 * @fileoverview SourceCodeModal component implementation
 *
 * This file contains implementation for modal window, that opens after click on a
 * ButtonSourceCode
 *
 * @module SourceCodeModal
 * 
 * @author xturyt00
 */
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

/**
 * SourceCodeModal component
 * 
 * @param props - Component props
 * @param props.data - JSON data to display in modal window 
 * @returns SourceCodeModal
 */
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