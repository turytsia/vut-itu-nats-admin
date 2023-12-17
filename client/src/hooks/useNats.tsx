import React, { useEffect, useState } from 'react'
import { connect, Msg, NatsConnection, MsgHdrs } from "nats.ws"

const connectNats = async (servers: string[]): Promise<NatsConnection | null> => {
    // const disconnect = () => {
    //     natsConnection.close()
    // };

    console.log("subscribing")

    let natsConnection: NatsConnection
    try {
        natsConnection = await connect({ servers });
    } catch (err) {
        console.log(err)
        return null
    }

    return natsConnection
}

export const decode = (data: Uint8Array): string => {
    return new TextDecoder().decode(data)
}

const useNats = (servers: string[]) => {
    const [messages, setMessages] = useState<Msg[]>([])
    const [natsConnection, setNatsConnection] = useState<NatsConnection | null>(null)
    const [ownMessages, setOwnMessages] = useState<string[]>([])
    const [connected, setConnected] = useState<boolean>(false)

    const isOwn = (message: Msg) => {
        return ownMessages.includes(message.headers?.get("X-Jetono-UUID") || "")
    }

    const isConnected = () => {
        return connected
    }

    const subscribe = async () => {

        if (natsConnection !== null) {
            setConnected(true)
            return
        }

        const nc = await connectNats(servers)
        if (!nc) {
            setConnected(false)
            return
        }

        
        const sub = nc.subscribe(">", {
            callback: (err, msg) => {
                console.log("Received message")
                if (err) {
                    return
                }
                
                setMessages((prev: Msg[]) => [...prev, msg])
            }
        })
        
        // setMessages([]);
        setNatsConnection(nc)
    }

    const publish = async (subject: string, headers: MsgHdrs, data: string) => {
        const natsConnection = await connectNats(servers)
        if (!natsConnection) {
            return
        }

        // add UUID header to recognize messages from this client
        const uuid = crypto.randomUUID();
        headers.append("X-Jetono-UUID", uuid)

        natsConnection.publish(subject, data, { headers: headers })

        setOwnMessages((prev: string[]) => [...prev, uuid])
    }

    useEffect(() => {
        // setMessages([]);
        subscribe()
    }, [servers, natsConnection])

    // reset messages on server change
    // useEffect(() => {
    //     setMessages([]);
    // }, [servers, natsConnection])

    return {
        messages,
        isOwn,
        publish,
        isConnected
    }
}

export default useNats