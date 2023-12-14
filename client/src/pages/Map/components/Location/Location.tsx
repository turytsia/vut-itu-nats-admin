import React, { useContext } from 'react'
import { DataFlowType } from '../../../../utils/axios'
import classes from "./Location.module.css"
import { AppContext } from '../../../../context/AppContextProvider'
import classNames from 'classnames'

type PropsType = {
    data: DataFlowType
    onClick: (location: DataFlowType) => void
}

const Location = ({
    data,
    onClick
}: PropsType) => { 
    const { isDark } = useContext(AppContext)
    
    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })
    return (
        <div className={containerStyles} onClick={() => onClick(data)}>
            {data.name}
        </div>
    )
}

export default Location