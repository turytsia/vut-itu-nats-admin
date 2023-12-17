import {ChangeEventHandler, FormEventHandler, useContext, useState} from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import classes from "./MessageForm.module.css"
import {MsgHdrs, headers} from "nats.ws";
import { AppContext } from "../../../context/AppContextProvider";
import classNames from "classnames";

export type Headers = {
    [key: string]: string
}


type PropsType = {
    onSubmit: (subject: string, headers: MsgHdrs, data: string) => void
}

type MsgState = {
    subject: string
    headerKeys: string[]
    headerValues: string[]
    data: string
}

const MessageForm = ({
    onSubmit
}: PropsType) => {
    // hooks for component state
    const [state, setState] = useState<MsgState>({
        subject: "",
        headerKeys: [""],
        headerValues: [""],
        data: ""
    })
    // hooks for theme
    const {isDark} = useContext(AppContext)


    /**
     * Handles form submit.
     *
     * @version 0.1.0
     *
     * @param subject - Subject of the message.
     * @param event - Submit event.
     */
    const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
        // create headers instance for nats
        const NATSHeaders = headers();
        // set headers
        state.headerKeys.slice(0, state.headerKeys.length - 1).map((key, index) => {
            return NATSHeaders.append(key, state.headerValues[index])
        })
        // submit form
        onSubmit(state.subject, NATSHeaders, state.data)
    }

    /**
     * Handles input changes.
     *
     * @version 0.1.0
     * @param e - Input change event.
     */
    const handleSubjectChange = (e: any) => {
        // update state
        setState({...state, [e.target.name]: e.target.value})
    }

    /**
     * Handles header input changes.
     *
     * @version 0.1.0
     * @param e - Input change event.
     */
    const handleHeaderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        // extract name and value from event
        const {name, value} = e.target
        // extract key and index from name
        const [key, index] = name.split("-", 2)

        // convert index to number
        let number = Number(index);
        // replace state
        let newState = {...state}

        /**
         * Switches between header key and value.
         */
        switch (key) {
            case "headerKey":
                newState.headerKeys[number] = value
                break
            case "headerValue":
                newState.headerValues[number] = value
                break
        }

        /**
         * Validates header keys and values.
         */

        // if header key is empty and header value is empty and there is more than one header
        if (state.headerValues[number] === "" && state.headerKeys[number] === "" && state.headerKeys.length > 1) {
            newState.headerKeys.splice(number, 1)
            newState.headerValues.splice(number, 1)
        }

        // if header key is not empty and header value is empty and there is more than one header
        if (state.headerKeys.length - 1 === number && state.headerValues[number] !== "" && state.headerKeys[number] !== "") {
            newState.headerKeys.push("")
            newState.headerValues.push("")
        }

        // update state
        setState(newState)
    }

    // check if dark mode is enabled
    const messageContainerStyles = classNames(classes.messageContainer, {
        [classes.dark]: isDark
    })

    // render component
    return (
        <div className={messageContainerStyles}>
            <div className={classes.inputBox}>
                <Input
                    name="subject"
                    labelText="Subject"
                    value={state.subject}
                    onChange={handleSubjectChange} />
                <Input
                    name="data"
                    labelText="Data"
                    width={"300"}
                    value={state.data}
                    onChange={handleSubjectChange}
                />
            </div>
            <div className={classes.headerBox}>
                {state.headerKeys.map((key, index) => (
                    <div className={classes.headerInputs} key={index}>
                        <Input
                            name={`headerKey-${index}`}
                            placeholder="Key" width={"150"}
                            value={key}
                            onChange={handleHeaderChange}
                        />
                        <Input
                            name={`headerValue-${index}`}
                            placeholder="Value"
                            width={"150"}
                            value={state.headerValues[index]}
                            onChange={handleHeaderChange}
                        />
                    </div>
                ))}
            </div>
            <div className={classes.actions}>
                <Button isBlue onClick={handleSubmit}>Send</Button>
            </div>
        </div>
    )
}

export default MessageForm