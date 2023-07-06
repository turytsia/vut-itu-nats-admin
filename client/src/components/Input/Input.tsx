import React, { ChangeEvent, ChangeEventHandler, useCallback, useMemo } from 'react'
import classes from "./Input.module.css"
import classNames from 'classnames'
import icons from '../../utils/icons'
import { Icon } from '@iconify/react'
import InputContainer from "../InputContainer/InputContainer"



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

	const onCopy = useCallback(
		() => {
			navigator.clipboard.writeText(value)
		},
		[value]
	)

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
				id={classes.input}
				className={classes.input}
				value={value}
				disabled={disabled}
				placeholder={placeholder}
				name={name}
				onChange={onChange} />

			{isCopy && (
				<button className={classes.copy} onClick={onCopy}>
					<Icon icon={icons.copy} width={20} height={20} />
				</button>
			)}
		</InputContainer>
	)
}

export default Input