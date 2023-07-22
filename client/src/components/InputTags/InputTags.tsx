import React, { ChangeEvent, ChangeEventHandler, useCallback, useContext, useMemo, useRef, useState } from 'react'
import classes from "./InputTags.module.css"
import classNames from 'classnames'
import CopyButton from '../CopyButton/CopyButton'
import InputContainer from "../InputContainer/InputContainer"
import { AppContext } from '../../context/AppContextProvider'
import Tag from '../Tag/Tag'
import { getId } from '../../utils/id'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'



type PropsType = {
    isRequired?: boolean
    labelText?: string
    value?: string[]
    disabled?: boolean
    renderLeft?: React.ReactNode
    isFlex?: boolean
    width?: string
    placeholder?: string
    hintText?: string
    name?: string
    onChange?: React.Dispatch<React.SetStateAction<string[]>>
}

const InputTags = ({
    value: tags = [],
    labelText = "",
    placeholder = "",
    hintText = "",
    isRequired = false,
    disabled = false,
    renderLeft,
    isFlex,
    width,
    name,
    onChange: setTags = () => { }
}: PropsType) => {

    const id = getId().toString()
    const inputRef = useRef<HTMLInputElement>(null)

    const { isDark } = useContext(AppContext)
    const [value, setValue] = useState<string>("")
    const [isFocuse, setIsFocuse] = useState<boolean>(false)

    const onInputFocuse = () => setIsFocuse(true)

    const onInputBlur = () => setIsFocuse(false)

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onTagChange()
        }
    }

    const onTagChange = () => {
        if (value.length <= 0) return

        setTags(prev => [...prev, value])
        setValue("")
    }

    const onTagDelete = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag))
    }

    const inputStyles = classNames(classes.input, { [classes.dark]: isDark })
    const inputBoxStyles = classNames(classes.inputBox, { [classes.dark]: isDark })

    return (
        <InputContainer
            labelText={labelText}
            hintText={hintText}
            isRequired={isRequired}
            renderLeft={renderLeft}
            isFlex={isFlex}
            width={width}
        >
            <label htmlFor={id} className={inputBoxStyles} onMouseEnter={onInputFocuse} onMouseLeave={onInputBlur}>
                {tags.map(tag =>
                    <Tag
                        isBlue
                        key={getId()}
                        renderRight={
                            <Icon
                                className={classes.tagDeleteIcon}
                                onClick={() => onTagDelete(tag)}
                                icon={icons.close}
                                width={12}
                                height={12} />
                        }>
                        {tag}
                    </Tag>
                )}
                <input
                    id={id} // FIX
                    ref={inputRef}
                    className={inputStyles}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    name={name}
                    onFocus={onInputFocuse}
                    onChange={onValueChange}
                    onKeyUp={onKeyUp} />
                {isFocuse  && <Icon
                    className={classes.plusIcon}
                    onClick={onTagChange}
                    icon={icons.plus}
                    width={20}
                    height={20} />}
            </label>
        </InputContainer>
    )
}

export default InputTags