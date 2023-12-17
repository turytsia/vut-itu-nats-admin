/**
 * @fileoverview DataflowWindow component that renders the dataflow window
 *
 * This file contains DataflowWindow component that renders the dataflow window.
 *
 * @module DataflowWindow
 *
 * @exports DataflowWindow
 *
 * @version 0.1.0
 *
 * @author xbarza00
 */

import React, { useContext, useEffect } from "react";
import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import classes from "./DataFlowsWindow.module.css"
import uuid from "react-uuid";
import useNats from "../../../hooks/useNats"
import { AppContext } from "../../../context/AppContextProvider";
import classNames from "classnames";

type Props = {
    server: string
    name: string
}

const DataflowWindow = ({
    server,
    name
}: Props) => {
    // console.log(server)

    // hooks for nats
    const { messages, isOwn, publish, isConnected } = useNats(server)
    const { isDark } = useContext(AppContext)

    // hook for theme
    const titleStyles = classNames(classes.title, {
        [classes.dark]: isDark
    })

    // render component
    return (
        <div className={classes.main}>
            <h1 className={titleStyles}>
                <span className={classes.titleContent}>{name} {isConnected() ? <span className={classes.online}>Online</span> : <span className={classes.offline}>Offline</span>}</span>
                <span className={classes.subtitle}>{server}</span>
            </h1>
            <div className={classes.container}>
                {messages.map(message => (
                    <MessageBox
                        key={uuid()}
                        message={message}
                        isOwn={isOwn(message)}
                    />
                ))}
            </div>
            <div className={classes.formContainer}>
                <MessageForm onSubmit={publish}></MessageForm>
            </div>
        </div>
    );
}

export default DataflowWindow;
