import React, { ChangeEventHandler, useContext, useMemo } from 'react'

import classes from "./Checkbox.module.css"
import InputContainer from '../InputContainer/InputContainer'
import classNames from 'classnames'
import { AppContext } from '../../context/AppContextProvider'

type PropsType = {
    labelText?: string
    hintText?: string
    isRequired?: boolean
    name?: string
    value?: any
    onChange?: ChangeEventHandler<HTMLInputElement>
}

const Checkbox = ({
    labelText = "",
    hintText = "",
    isRequired = false,
    name = "",
    value = "",
    onChange = () => { },
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const inputStyles = useMemo(
        () => classNames(classes.input, { [classes.dark]: isDark }),
        []
    )

    return (
        <InputContainer
            isFlex
            labelText={labelText}
            hintText={hintText}
            isRequired={isRequired}>
            <input
                id={inputStyles}
                className={inputStyles}
                name={name}
                type='checkbox'
                onChange={onChange}
                checked={value} />
        </InputContainer>
    )
}

export default Checkbox