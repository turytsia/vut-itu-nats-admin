import React, { ChangeEvent, ChangeEventHandler, useCallback, useContext, useMemo } from 'react'
import classes from "./Input.module.css"
import classNames from 'classnames'
import CopyButton from '../CopyButton/CopyButton'
import InputContainer from "../InputContainer/InputContainer"
import { AppContext } from '../../context/AppContextProvider'



type PropsType = {
	isRequired?: boolean
	labelText?: string
	value?: any
	disabled?: boolean
	renderLeft?: React.ReactNode
	isFlex?: boolean
	width?: string
	isCopy?: boolean
	placeholder?: string
	hintText?: string
	name?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = ({
	value = "",
	labelText = "",
	placeholder = "",
	hintText = "",
	isRequired = false,
	disabled = false,
	renderLeft,
	isFlex,
	isCopy,
	width,
	name,
	onChange = () => { }
}: PropsType) => {

	const { isDark } = useContext(AppContext)

	const inputStyles = classNames(classes.input, { [classes.dark]: isDark })

	return (
		<InputContainer
			labelText={labelText}
			hintText={hintText}
			isRequired={isRequired}
			renderLeft={renderLeft}
			isFlex={isFlex}
			width={width}
		>
			<input
				id={inputStyles} // FIX
				className={inputStyles}
				value={value}
				disabled={disabled}
				placeholder={placeholder}
				name={name}
				onChange={onChange} />

			{isCopy && <CopyButton className={classes.copy} value={value} />}
		</InputContainer>
	)
}

export default Input