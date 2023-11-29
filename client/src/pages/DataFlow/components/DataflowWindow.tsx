import React, {useContext, useEffect, useState} from "react";
import {connect, Msg, NatsConnection, MsgHdrs} from "nats.ws"
import MessageBox from "./MessageBox";
import {AppContext} from "../../../context/AppContextProvider";
import MessageForm from "./MessageForm";
import classes from "./DataFlowsWindow.module.css"

const allSubjects = ">";
const jetonoUUIDHeader = "X-Jetono-UUID";

type Props = {
    server: string
}

function decode(data: Uint8Array): string {
    return new TextDecoder().decode(data)
}

const DataflowWindow = ({server}: Props) => {
    const {isDark} = useContext(AppContext)

    const [messages, setMessages] = useState<Msg[]>([])
    const [nc, setNc] = useState<NatsConnection | null>(null)
    const [ownMessages, setOwnMessages] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            const ret = () => {
                sub.unsubscribe()
                natsConnection.close()
            };

            if (nc !== null) {
                console.log("already subscribed")
                return ret
            }
            console.log("subscribing")

            let natsConnection: NatsConnection
            try {
                natsConnection = await connect({servers: [server]});
            } catch (err) {
                console.log(err)
                return
            }

            const sub = natsConnection.subscribe(allSubjects, {
                callback: (err, msg) => {
                    console.log("received message")
                    if (err) {
                        return
                    }

                    setMessages((prev: Msg[]) => [...prev, msg])
                }
            })

            setNc(natsConnection)

            return ret
        })()
    }, [server, nc])

    // reset messages on server change
    useEffect(() => {
        setMessages([]);
    }, [server])

    const onSend = (subject: string, headers: MsgHdrs, data: string) => {
        (async () => {
            let nc: NatsConnection
            try {
                nc = await connect({servers: [server]})
            } catch (err) {
                console.log(err)
                return
            }

            // add UUID header to recognize messages from this client
            const uuid = crypto.randomUUID();
            headers.append(jetonoUUIDHeader, uuid)

            nc.publish(subject, data, {headers: headers})

            setOwnMessages((prev: string[]) => [...prev, uuid])
        })()
    }

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h1>{server}</h1>
                {messages.map((m, i) => (
                    <MessageBox
                        subject={m.subject}
                        data={decode(m.data)}
                        headers={m.headers}
                        isDark={isDark}
                        jetonoMsgs={ownMessages}
                    ></MessageBox>
                ))
                }
            </div>
            <div className={classes.formContainer}>
                <MessageForm onSubmit={onSend}></MessageForm>
            </div>
        </div>
    );
}

export default DataflowWindow;
