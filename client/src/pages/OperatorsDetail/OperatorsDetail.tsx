import React, { useCallback, useContext, useEffect, useState } from 'react'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContextProvider'
import { OperatorType } from '../../utils/axios'
import Text from '../../components/Text/Text'

import classes from "./OperatorsDetail.module.css"

const OperatorsDetail = () => {
	const { operator: name } = useParams()
	
	const { request } = useContext(AppContext)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [operator, setOperator] = useState<OperatorType | null>(null)

	const fetch = useCallback(
		async () => {
			setIsLoading(true)
			try {
				const operator = await request.get.operator(name as string)
				setOperator(operator)
			}
			catch (e) {
				console.error(e)
			}
			finally {
				setIsLoading(false)
			}
		},
		[]
	)

	useEffect(() => {
		fetch()
	}, [])

	return (
		<Page
			title={name as string}
			renderActions={
				<Button onClick={() => { }}>
					Edit operator
					<Icon icon={icons.pen} width={20} height={20} />
				</Button>
			}>
			<p className={classes.version}>Version: {operator?.nats.version}</p>
			<div className={classes.container}>
				<Text labelText="Name">{name}</Text>
			</div>
		</Page>
	)
}

export default OperatorsDetail