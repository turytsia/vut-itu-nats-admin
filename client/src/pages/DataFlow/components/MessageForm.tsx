import {ChangeEventHandler, FormEventHandler, useState} from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import classes from "./MessageForm.module.css"
import {MsgHdrs, headers} from "nats.ws";

export type Headers = {
    [key: string]: string
}


type Props = {
    onSubmit: (subject: string, headers: MsgHdrs, data: string) => void
}

type MsgState = {
    subject: string
    headerKeys: string[]
    headerValues: string[]
    data: string
}

const MessageForm = (
    {onSubmit}: Props
) => {
    const [state, setState] = useState<MsgState>({
        subject: "",
        headerKeys: [""],
        headerValues: [""],
        data: ""
    })

    const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
        const NATSHeaders = headers();
        state.headerKeys.slice(0, state.headerKeys.length - 1).map((key, index) => {
            return NATSHeaders.append(key, state.headerValues[index])
        })
        onSubmit(state.subject, NATSHeaders, state.data)
    }

    const handleSubjectChange = (e: any) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleHeaderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
        const [key, index] = name.split("-", 2)

        let number = Number(index);
        let newState = {...state}

        switch (key) {
            case "headerKey":
                newState.headerKeys[number] = value
                break
            case "headerValue":
                newState.headerValues[number] = value
                break
        }

        if (state.headerValues[number] === "" && state.headerKeys[number] === "" && state.headerKeys.length > 1) {
            newState.headerKeys.splice(number, 1)
            newState.headerValues.splice(number, 1)
        }

        if (state.headerKeys.length - 1 === number && state.headerValues[number] !== "" && state.headerKeys[number] !== "") {
            newState.headerKeys.push("")
            newState.headerValues.push("")
        }

        setState(newState)
    }

    return (
        <div className={classes.messageContainer}>
            <div className={classes.inputBox}>
                <Input name="subject" placeholder="Subject" width={"300"} value={state.subject}
                       onChange={handleSubjectChange}/>
            </div>
            <div className={classes.headerBox}>
                {
                    state.headerKeys.map((key, index) => {
                        return (
                            <div className={classes.inputBox} key={index}>
                                <Input name={`headerKey-${index}`} placeholder="Key" width={"150"} value={key}
                                       onChange={handleHeaderChange}/>
                                <span className={classes.colon}> </span>
                                <Input name={`headerValue-${index}`} placeholder="Value" width={"150"}
                                       value={state.headerValues[index]}
                                       onChange={handleHeaderChange}/>
                            </div>
                        )
                    })
                }
            </div>
            <div className={classes.inputBox}>
                <Input name="data" placeholder="Data" width={"300"} value={state.data}
                       onChange={handleSubjectChange}/>
            </div>
            <Button isBlue={true} onClick={handleSubmit}>Send</Button>
        </div>
    )
}

export default MessageForm