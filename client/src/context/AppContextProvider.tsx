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
import Request from "../utils/axios"

// Type of application context provider
type AppContextProviderType = (props: PropsType) => JSX.Element

// Application state context type
type AppContextType = {
    isDark: boolean
    toggleIsDark: () => void
    request: Request
}

// component props type
type PropsType = {
    children: React.ReactNode
}

// Storage protocol 
const storage = new Storage()

// Request protocol
export const request = new Request()

// Initial application state context
const initialValue: AppContextType = {
    isDark: false,
    toggleIsDark: () => { },
    request
}

/** 
 * Root element where floating elements are generated 
 */
export const floatingRoot = document.getElementById("portal")

/** 
 * Application state context 
 */
export const AppContext = createContext<AppContextType>(initialValue)

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

    /** 
     * Toggles isDark true/false 
     */
    const toggleIsDark = useCallback(() => {
        setIsDark(prev => {
            storage.set.isDark(!prev)
            return !prev
        })
    }, [])

    /** Application state inicialization */
    const value: AppContextType = {
        isDark,
        request,
        toggleIsDark,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider