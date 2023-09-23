/**
 * @fileoverview Input component implementation
 *
 * This file contains implementation of a Input component. This is a
 * common component for an input in the entire application.
 *
 * @module Input
 * 
 * @author xturyt00
 */
import React, { ChangeEventHandler, useContext } from 'react'
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

/**
 * Input component
 * 
 * @param props - Component props
 * @param props.value - Value
 * @param props.labelText - Label text
 * @param props.placeholder - Placeholder
 * @param props.hintText - Tooltip text
 * @param props.isRequired - Require input (default = false)
 * @param props.disabled - Disable input (default = false)
 * @param props.renderLeft - Render elements to the left from label
 * @param props.isFlex - Flex input (default = false)
 * @param props.isCopy - Enable copy button (default = false)
 * @param props.width - Manually set width
 * @param props.name - Name
 * @param props.onChange - Callback to change an input
 * @returns Input component
 */
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