/**
 * @fileOverview MessageBox.tsx
 *
 * @exports MessageBox
 *
 * @version 1.0.0
 *
 * @module MessageBox
 *
 * @author xbarza00
 */

import classes from "./MessageBox.module.css";
import classNames from "classnames";
import { Msg, MsgHdrs } from "nats.ws";
import icons from "../../../utils/icons";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import uuid from "react-uuid";
import { AppContext } from "../../../context/AppContextProvider";
import { decode } from "../../../hooks/useNats";

type PropsType = {
    className?: string
    message: Msg,
    isOwn: boolean
}

const MessageBox = ({
    className,
    message,
    isOwn
}: PropsType) => {
    // hooks for theme
    const { isDark } = useContext(AppContext)

    // hooks for component state, headers and styles
    const [showHeaders, setShowHeaders] = React.useState(false)

    const headerStyles = classNames(classes.containerHeader, {
        [classes.dark]: isDark,
        [classes.own]: isOwn
    })

    const messageStyles = classNames(classes.messageContainer, {
        [classes.dark]: isDark,
        [classes.own]: isOwn
    })

    // handle show headers, when icon is clicked
    const handleShowHeaders = () => {
        setShowHeaders(!showHeaders)
    }

    // extract headers keys
    let keys = message.headers?.keys();

    // render component with message data
    return (
        <div className={messageStyles}>
            <div className={headerStyles}>
                <div className={classes.subject}>
                    {message.subject}
                    {isOwn && <span className={classes.ownSubject}>(You)</span>}
                </div>

                <Icon icon={icons.info} width={24} height={24} onClick={handleShowHeaders} />
            </div>
            <div className={classes.containerHeaders} hidden={!showHeaders}>
                {(!keys || keys?.length === 0) && <p className={classes.containerHeadersEmpty}>No data</p>}
                {keys?.map((key, index) => (
                    <div key={uuid()}>
                        <div className={classes.header}>
                            <div className={classes.headerKey}>{key}</div>
                            <div className={classes.headerValue}>{message.headers?.get(key)}</div>
                        </div>
                        {keys && index !== keys.length - 1 && <hr className={classes.line} />}
                    </div>
                ))}
            </div>
            <div className={classes.containerData}>
                <div className={classes.data}>{decode(message.data)}</div>
            </div>
        </div>
    )
}

export default MessageBox
