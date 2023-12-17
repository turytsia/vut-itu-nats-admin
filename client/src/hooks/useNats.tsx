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

const useNats = (server: string) => {
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

        if (natsConnection) {
            close()
        }

        const nc = await connectNats([server])

        setConnected(!!nc)
        setNatsConnection(nc)

        if (!nc) {
            return
        }

        
        const sub = nc.subscribe(">", {
            callback: (err, msg) => {
                console.log("Received message")
                if (err) {
                    return
                }
                
                setMessages(prev => [...prev, msg])
            }
        })
        
    }

    const publish = async (subject: string, headers: MsgHdrs, data: string) => {
        const natsConnection = await connectNats([server])
        if (!natsConnection) {
            return
        }

        // add UUID header to recognize messages from this client
        const uuid = crypto.randomUUID();
        headers.append("X-Jetono-UUID", uuid)

        natsConnection.publish(subject, data, { headers: headers })

        setOwnMessages((prev: string[]) => [...prev, uuid])
    }

    const close = async () => {
        console.log(natsConnection)
        if (!natsConnection) return

        try {
            await natsConnection.close()
            console.log("Nats connection closed")
        } catch (error) {
            console.error(error)
        }        
    }

    useEffect(() => {
        setMessages([]);
        subscribe()

    }, [server])

    // reset messages on server change
    useEffect(() => {
        return () => {
            close()
        }
    }, [])

    return {
        messages,
        isOwn,
        publish,
        isConnected
    }
}

export default useNats