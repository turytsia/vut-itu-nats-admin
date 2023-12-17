/**
 * @module OpearatorsDetail
 *
 * @author xturyt00
 */

import { useCallback, useContext, useEffect, useState } from 'react'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import { useParams } from 'react-router-dom'
import { AppContext, notify } from '../../context/AppContextProvider'
import { OperatorPatchType, OperatorType } from '../../utils/axios'
import EditOperatorModal, { EditOperatorType } from './modals/EditOperatorModal/EditOperatorModal'
import Tag from '../../components/Tag/Tag'
import { SecondsToMs, dateFormat, datetimeFormat } from '../../utils/common'
import Details from "../../components/Details/Details"
import uuid from 'react-uuid'

import classes from "./OperatorsDetail.module.css"
import ButtonSourceCode from '../../components/ButtonSourceCode/ButtonSourceCode'

/**
 * OperatorsDetail page component
 *
 * @returns OperatorsDetail page
 */
const OperatorsDetail = () => {
	/**
	 * Hook that extracts the name parameter from the url.
	 */
	const { operator: name } = useParams()

	// search hook that is used to filter the table
	const [search, setSearch] = useState<string>("")
	const [error, setError] = useState<string>("")

	// request hook for api calls
	const { request } = useContext(AppContext)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	// hook for handling the operator update modal
	const [operator, setOperator] = useState<OperatorType | null>(null)

	const [isEditModal, setIsEditModal] = useState<boolean>(false)

	/**
	 * Callbacks
	 */

	// fetch operator data
	const fetch = useCallback(
		async () => {
			try {
				// set loading state
				setIsLoading(true)

				// fetch operator data
				const operator = await request.get.operator(name as string)

				// set operator data
				setOperator(operator)
			}
			catch (e) {
				console.error(e)
			}
			finally {
				// disable loading
				setIsLoading(false)
			}
		},
		[]
	)

	// onEditSubmit callback used to submit the operator update form
	const onEditSubmit = async (settings: OperatorPatchType) => {
		try {
			// set loading state
			setIsLoading(true)

			// send request to update the operator
			const response = await request.patch.operator(name as string, settings)
			// in case of error, set error message
			setError(response.type === "success" ? "" : response.data.message)

			// if response is success, fetch the operator data
			if (response.type === "success") {
				// fetch operator data
				const operator = await request.get.operator(name as string)
				//	set operator data
				setOperator(operator)
				// close the modal
				setIsEditModal(false)
				// notify the user
				notify(response.data.message, "success")
			}
		}
		catch (e) {
			console.error(e)
		}
		finally {
			// disable loading
			setIsLoading(false)
		}
	}

	/**
	 * Effects
	 */

	// useEffect hook used to fetch operator data
	const onChangeInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
		[]
	)

	useEffect(() => {
		fetch()
	}, [])

	// render
	return (
		<Page title={name as string}>
			<Details
				renderActions={
					<>
						<ButtonSourceCode data={operator ?? {}} />
						<Button isBlue onClick={() => setIsEditModal(true)}>
							Update Operator
							<Icon icon={icons.pen} width={20} height={20} />
						</Button>
					</>
				}
				filtersConfig={{
					searchConfig: {
						input: {
							value: search,
							onChange: onChangeInput
						}
					}
				}}
				detailsConfig={[
					{
						title: {
							value: "General",
							icon: icons.settings
						},
						attributes: [
							{
								name: "Name",
								value: name,
							},
							{
								name: "Issuer",
								value: operator?.iss,
							},
							{
								name: "Subject",
								value: operator?.sub,
							},
							{
								name: "Created at",
								value: datetimeFormat(SecondsToMs(operator?.iat!)),
							},
							{
								name: "Start at",
								value: operator?.nbf ? datetimeFormat(SecondsToMs(operator?.nbf)) : null,
							},
							{
								name: "Expires at",
								value: operator?.exp ? datetimeFormat(SecondsToMs(operator?.exp)) : null,
							},
						]
					},
					{
						title: {
							value: "Secret",
							icon: icons.lock
						},
						attributes: [
							{
								name: "JWT Token",
								value: operator?.jti,
								isSecret: true
							},
							{
								name: "Signing Keys",
								value: operator?.jti,
								isSecret: true
							}
						]
					},
					{
						title: {
							value: "Nats",
							icon: icons.message
						},
						attributes: [
							{
								name: "Type",
								value: operator?.nats.type,
							},
							{
								name: "Account server URL",
								value: operator?.nats.account_server_url,
							},
							{
								name: "System account",
								value: operator?.nats.system_account,
								isSecret: true
							},
							{
								name: "Tags",
								value: operator?.nats.tags ? (
									<span className={classes.tags}>{operator?.nats.tags.map(tag => <Tag key={uuid()} isBlue>{tag}</Tag>)}</span>
								) : null,
							},
							{
								name: "Service URLs",
								value: operator?.nats.operator_service_urls ? (
									<span className={classes.tags}>{operator?.nats.operator_service_urls.map(tag => <Tag key={uuid()} isBlue>{tag}</Tag>)}</span>
								) : null,
							},
							{
								name: "Require entities to be signed with a key",
								value: operator?.nats.strict_signing_key_usage ? "Yes" : "No",
							},
							{
								name: "Version",
								value: operator?.nats.version
							}
						]
					}
				]} />
			{(isEditModal && operator) && (
					<EditOperatorModal
						error={error}
						operator={operator}
						onSubmit={onEditSubmit}
						onClose={() => setIsEditModal(false)}
					/>
			)}
		</Page>
	)
}

export default OperatorsDetail
