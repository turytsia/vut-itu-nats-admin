import React, { useCallback, useContext, useEffect, useState } from 'react'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContextProvider'
import { OperatorType } from '../../utils/axios'
import Text from '../../components/Text/Text'
import TextSection from '../../components/TextSection/TextSection'
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon'

import classes from "./OperatorsDetail.module.css"
import Popover from '../../components/Popover/Popover'
import JWTModal from './modals/JWTModal/JWTModal'
import EditOperatorModal from './modals/EditOperatorModal/EditOperatorModal'
import Tag from '../../components/Tag/Tag'

const OperatorsDetail = () => {
	const { operator: name } = useParams()

	const { request } = useContext(AppContext)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [operator, setOperator] = useState<OperatorType | null>(null)

	const [isJWTView, setIsJWTView] = useState<string>("")
	const [isEditModal, setIsEditModal] = useState<boolean>(false)

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

	const onEditModalOpen = () => {
		setIsEditModal(true)
	}

	const onEditModalClose = () => {
		setIsEditModal(false)
	}

	const onEditSubmit = () => {
		onEditModalClose()
	}

	const onJWTModalOpen = () => {
		setIsJWTView(operator?.jti as string)
	}

	const onJWTModalClose = () => {
		setIsJWTView("")
	}

	useEffect(() => {
		fetch()
	}, [])

	return (
		<Page
			title={name as string}
			tagText={`Version ${operator?.nats.version}`}
			renderActions={
				<Button onClick={onEditModalOpen}>
					Edit operator
					<Icon icon={icons.pen} width={20} height={20} />
				</Button>
			}>
			<div className={classes.container}>
				<TextSection icon={icons.settings} text='General'>
					<Text labelText="Name">{name}</Text>
					<Text labelText="Issuer">{operator?.iss}</Text>
					<Text labelText="Subject">{operator?.sub}</Text>
					<Text labelText="Created at">{operator?.iat}</Text>
				</TextSection>
				<TextSection icon={icons.lock} text='Secret'>
					<Text labelText="JWT Token">
						<ButtonIcon icon={icons.eye} onClick={onJWTModalOpen} />
					</Text>
					<Text labelText="Signing Keys">
						<ButtonIcon icon={icons.eye} onClick={onJWTModalOpen} />
					</Text>
				</TextSection>
				<TextSection icon={icons.message} text='Nats'>
					<Text labelText="Type">{operator?.nats.type}</Text>
					{operator?.nats.account_server_url &&
						<Text labelText="Account server URL">
							{operator?.nats.account_server_url}
						</Text>
					}
					{operator?.nats.tags &&
						<Text className={classes.tags} labelText="Tags">
							{operator?.nats.tags.map(tag => <Tag>{tag}</Tag>)}
						</Text>

					}
				</TextSection>

			</div>
			{!!isJWTView && <JWTModal token={isJWTView} onClose={onJWTModalClose} />}
			{(isEditModal && operator) && <EditOperatorModal onClose={onEditModalClose} onSubmit={onEditSubmit} operator={operator} />}
		</Page>
	)
}

export default OperatorsDetail