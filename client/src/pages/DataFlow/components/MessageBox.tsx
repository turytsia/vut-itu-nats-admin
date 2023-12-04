import classes from "./MessageBox.module.css";
import classNames from "classnames";
import { MsgHdrs } from "nats.ws";
import icons from "../../../utils/icons";
import { Icon } from "@iconify/react";
import React from "react";
import uuid from "react-uuid";

const MessageBox = (
    props: {
        className?: string
        subject: string
        data: string
        headers: MsgHdrs | undefined
        isDark: boolean
        jetonoMsgs: string[]
    }
) => {
    const [showHeaders, setShowHeaders] = React.useState(false)

    const isOwn = props.jetonoMsgs.includes(props.headers?.get("X-Jetono-UUID") || "")

    const headerStyles = classNames(classes.containerHeader, {
        [classes.dark]: props.isDark,
        [classes.own]: isOwn
    })

    const messageStyles = classNames(classes.messageContainer, {
        [classes.own]: isOwn
    })

    const handleShowHeaders = () => {
        setShowHeaders(!showHeaders)
    }


    let keys = props.headers?.keys();
    return (
        <div className={messageStyles}>
            <div className={headerStyles}>
                <div className={classes.subject}>
                    {props.subject}
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
                            <div className={classes.headerValue}>{props.headers?.get(key)}</div>
                        </div>
                        {keys && index !== keys.length - 1 && <hr className={classes.line} />}
                    </div>
                ))}
            </div>
            <div className={classes.containerData}>
                <div className={classes.data}>{props.data}</div>
            </div>
        </div>
    )
}

export default MessageBox
