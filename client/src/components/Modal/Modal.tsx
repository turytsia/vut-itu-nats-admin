import React, { MouseEventHandler, useCallback, useContext, useMemo } from 'react'

import classes from "./Modal.module.css"
import { FloatingPortal } from '@floating-ui/react'
import { AppContext, floatingRoot } from '../../context/AppContextProvider'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import Button from '../Button/Button'
import classNames from 'classnames'

type PropsType = {
    title: string
    children: React.ReactNode
    textProceed: string
    textCancel: string
    onClose: () => void
    onSubmit: () => void
    error?: string
    icon: icons
}

const Modal = ({
    title,
    children,
    error = "",
    textProceed,
    textCancel,
    icon,
    onClose,
    onSubmit
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const headerStyles = useMemo(
        () => classNames(classes.header, { [classes.dark]: isDark }),
        [isDark]
    )

    const containerStyles = useMemo(
        () => classNames(classes.container, { [classes.dark]: isDark }),
        [isDark]
    )

    const closeStyles = useMemo(
        () => classNames(classes.close, { [classes.dark]: isDark }),
        [isDark]
    )

    const onPropagationStop: MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            e.stopPropagation()
        },
        []
    )

    return (
        <FloatingPortal root={floatingRoot}>
            <div className={classes.outer} onClick={onClose}>
                <div className={containerStyles} onClick={onPropagationStop}>
                    <header className={headerStyles}>
                        <div className={classes.headerTitle}>
                            <Icon icon={icon} height={25} width={25} />
                            {title}
                        </div>
                        <button className={closeStyles} onClick={onClose}>
                            <Icon icon={icons.close} height={25} width={25} />
                        </button>
                    </header>
                    <div className={classes.content}>{children}</div>
                    <footer className={classes.footer}>
                        <div className={classes.errorContainer}>
                            {error && <p className={classes.error}><Icon icon={icons.error} height={20} width={20} /> {error}</p>}
                        </div>
                        <div className={classes.actions}>
                            <Button onClick={onClose}>
                                {textCancel}
                            </Button>
                            <Button isBlue onClick={onSubmit}>
                                {textProceed}
                            </Button>
                        </div>
                    </footer>
                </div>
            </div>
        </FloatingPortal>
    )
}

export default Modal