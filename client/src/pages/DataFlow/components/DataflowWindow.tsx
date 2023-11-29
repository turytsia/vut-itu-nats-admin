import React, { useContext, useEffect, useState } from "react";
import { connect, Msg, NatsConnection, MsgHdrs } from "nats.ws"
import MessageBox from "./MessageBox";
import { AppContext } from "../../../context/AppContextProvider";
import MessageForm from "./MessageForm";
import classes from "./DataFlowsWindow.module.css"
import uuid from "react-uuid";

const allSubjects = ">";
const jetonoUUIDHeader = "X-Jetono-UUID";

type Props = {
    server: string
    name: string
}

function decode(data: Uint8Array): string {
    return new TextDecoder().decode(data)
}

const DataflowWindow = ({
    server,
    name
}: Props) => {
    const { isDark } = useContext(AppContext)

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
                natsConnection = await connect({ servers: [server] });
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
                nc = await connect({ servers: [server] })
            } catch (err) {
                console.log(err)
                return
            }

            // add UUID header to recognize messages from this client
            const uuid = crypto.randomUUID();
            headers.append(jetonoUUIDHeader, uuid)

            nc.publish(subject, data, { headers: headers })

            setOwnMessages((prev: string[]) => [...prev, uuid])
        })()
    }

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
                        subject={message.subject}
                        data={decode(message.data)}
                        headers={message.headers}
                        isDark={isDark}
                        jetonoMsgs={ownMessages}
                    />
                ))}
            </div>
            <div className={classes.formContainer}>
                <MessageForm onSubmit={onSend}></MessageForm>
            </div>
        </div>
    );
}

export default DataflowWindow;
