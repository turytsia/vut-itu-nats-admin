/**
 * useNats hook
 *
 * This hook is used to connect to a NATS server and subscribe to all messages.
 *
 * @module useNats
 *
 * @author xturyt00
 * @author xbarza00
 */

import React, { useEffect, useState } from 'react'
import { connect, Msg, NatsConnection, MsgHdrs } from "nats.ws"

/**
 * Connects to NATS server and returns the connection.
 *
 * @param servers Array of NATS server URLs.
 * @returns Promise<NatsConnection | null> NATS connection or null if the connection fails.
 */
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

/**
 * Decodes a Uint8Array to a string.
 *
 * @param data Uint8Array data to decode.
 * @returns Decoded string.
 */
export const decode = (data: Uint8Array): string => {
    return new TextDecoder().decode(data)
}

/**
 * Custom hook for connecting to a NATS server and handling subscriptions.
 *
 * @param server NATS server URL.
 * @returns Object with hook functionalities: messages, isOwn, publish, isConnected.
 */
const useNats = (server: string) => {
    const [messages, setMessages] = useState<Msg[]>([])
    const [natsConnection, setNatsConnection] = useState<NatsConnection | null>(null)
    const [ownMessages, setOwnMessages] = useState<string[]>([])
    const [connected, setConnected] = useState<boolean>(false)

    /**
     * Checks if a message is sent by the current client based on X-Jetono-UUID header.
     *
     * @param message NATS message.
     * @returns True if the message is sent by the current client, false otherwise.
     */
    const isOwn = (message: Msg) => {
        return ownMessages.includes(message.headers?.get("X-Jetono-UUID") || "")
    }

    /**
     * Checks if the NATS connection is established.
     *
     * @returns True if connected, false otherwise.
     */
    const isConnected = () => {
        return connected;
    };

    /**
     * Subscribes to all NATS messages on the specified server.
     */
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
        const natsConnection = await connectNats([server]);
        if (!natsConnection) {
            return;
        }

        // add UUID header to recognize messages from this client
        const uuid = crypto.randomUUID();
        headers.append("X-Jetono-UUID", uuid)

        natsConnection.publish(subject, data, { headers: headers })

        setOwnMessages((prev: string[]) => [...prev, uuid])
    }

    /**
     * Closes the NATS connection.
     */
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