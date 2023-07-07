import React, { ChangeEvent, ChangeEventHandler, useCallback, useContext, useMemo } from 'react'
import classes from "./Input.module.css"
import classNames from 'classnames'
import icons from '../../utils/icons'
import { Icon } from '@iconify/react'
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

	const onCopy = useCallback(
		() => {
			navigator.clipboard.writeText(value)
		},
		[value]
	)

	const inputStyles = useMemo(
		() => classNames(classes.input, { [classes.dark]: isDark }),
		[isDark]
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
				id={inputStyles} // FIX
				className={inputStyles}
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