/**
 * @fileoverview context provider for application state context
 *
 * This file contains context provider for application state context
 *
 * @module AppContextProvider
 * 
 * @author xturyt00
 */

import React, { createContext, useCallback, useState } from 'react'

// modules
import Storage from "../utils/storage"

/** Type of application context provider */
type AppContextProviderType = (props: PropsType) => JSX.Element

/** Application state context type */
type AppContextType = {
    isDark: boolean
    toggleIsDark: () => void
}

/** component props type */
type PropsType = {
    children: React.ReactNode
}

/** Initial application state context */
const initialValue: AppContextType = {
    isDark: false,
    toggleIsDark: () => {}
}

/** Application state context */
export const AppContext = createContext(initialValue)
/** Storage protocol */
const storage = new Storage()

/**
 * Provides general state for the entire application
 * 
 * @param props component props
 * @returns returns children wrapped with application context provider
 */
const AppContextProvider: AppContextProviderType = ({
    children
}: PropsType) => {
    const [isDark, setIsDark] = useState<boolean>(storage.get.isDark())

    /** Toggles isDark true/false */
    const toggleIsDark = useCallback(
        () => { 
            storage.set.isDark(!isDark)
            setIsDark(prev => !prev)
        },
        []
    )

    /** Application state inicialization */
    const value: AppContextType = {
        isDark,
        toggleIsDark
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider