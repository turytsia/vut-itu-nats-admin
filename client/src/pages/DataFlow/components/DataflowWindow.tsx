import React, { useContext } from "react";
import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import classes from "./DataFlowsWindow.module.css"
import uuid from "react-uuid";
import useNats from "../../../hooks/useNats"

type Props = {
    server: string
    name: string
}

const DataflowWindow = ({
    server,
    name
}: Props) => {

    const { messages, isOwn, publish } = useNats([server])

    return (
        <div className={classes.main}>
            <h1 className={classes.title}>
                {name}
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
