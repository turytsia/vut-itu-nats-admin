import { useCallback, useContext, useEffect, useState } from 'react'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContextProvider'
import { OperatorPatchType, OperatorType } from '../../utils/axios'
import EditOperatorModal, { EditOperatorType } from './modals/EditOperatorModal/EditOperatorModal'
import Tag from '../../components/Tag/Tag'
import { SecondsToMs, dateFormat, datetimeFormat } from '../../utils/common'
import Details from "../../components/Details/Details"

const OperatorsDetail = () => {
	const { operator: name } = useParams()

	const [search, setSearch] = useState<string>("")
	const [error, setError] = useState<string>("")

	const { request } = useContext(AppContext)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [operator, setOperator] = useState<OperatorType | null>(null)

	const [isJWTView, setIsJWTView] = useState<string>("")
	const [isEditModal, setIsEditModal] = useState<boolean>(false)

	const fetch = useCallback(
		async () => {
			try {
				setIsLoading(true)

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

	const onEditSubmit = async (settings: OperatorPatchType) => {
		try {
			setIsLoading(true)

			const response = await request.patch.operator(name as string, settings)
			setError(response.type === "success" ? "" : response.data.message)
			if (response.type === "success") {
				console.log(response)
			}
		}
		catch (e) {
			console.error(e)
		}
		finally {
			setIsLoading(false)
		}
	}

	const onChangeInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
		[]
	)

	useEffect(() => {
		fetch()
	}, [])

	return (
		<Page title={name as string}>
			<Details
				renderActions={
					<Button isBlue onClick={() => setIsEditModal(true)}>
						Update Operator
						<Icon icon={icons.pen} width={20} height={20} />
					</Button>
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
								value: operator?.jti,
								isSecret: true
							},
							{
								name: "Tags",
								value: operator?.nats.tags ? operator?.nats.tags.map(tag => <Tag isBlue>{tag}</Tag>) : null,
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
