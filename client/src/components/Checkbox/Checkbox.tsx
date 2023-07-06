import React, { ChangeEventHandler } from 'react'

import classes from "./Checkbox.module.css"
import InputContainer from '../InputContainer/InputContainer'

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
    return (
        <InputContainer
            isFlex
            labelText={labelText}
            hintText={hintText}
            isRequired={isRequired}>
            <input
                id={classes.input}
                className={classes.input}
                name={name}
                type='checkbox'
                onChange={onChange}
                value={value} />
        </InputContainer>
    )
}

export default Checkbox