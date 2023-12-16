import React, { useCallback, useContext, useEffect, useState } from 'react'
import Page from '../../components/Page/Page'
import Table from '../../components/Table/Table'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import Button from '../../components/Button/Button'
import { UserType, UserPayload } from '../../utils/axios'
import { AppContext, notify } from '../../context/AppContextProvider'
import {defaultFiltersConfig, defaultTableConfig } from '../../utils/views/tables'
import { NSCDateFormat, SecondsToMs, dateFormat, datetimeFormat, fetchUsers } from '../../utils/common'
import UserRowActions from "./components/UserRowActions"
import CreateUserModal from "./modals/CreateUserModal.module"

export type UsersExtention = { operator: string, account: string }
export type ExtendedUserType = UserType & UsersExtention

const Users = () => {

    const { request } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<ExtendedUserType[]>([])
    const [operators, setOperators] = useState<string[]>([])
    const [isCreateActive, setIsCreateActive] = useState<boolean>(false)
    const [error, setError] = useState<string>("")


    const fetch = useCallback(
        async () => {
            setIsLoading(true);

            try {
                
                const users = await fetchUsers()
                setOperators(users.map(user => user.operator))
                setUsers(users)

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        },
        [request]
    );

    /**
     * Submits form to create new user
     */
    const onUserSubmit = useCallback(
        async (form: UserPayload) => {
            try {
                const response = await request.post.user(form.operator as string, form.account, form)

                if (response.type === "error") {
                    setError(response.data?.message || "An error occurred.");
                    return
                } 

                const users = await fetchUsers()

                setUsers(users)
                setError("");
                setIsCreateActive(false)
                notify(response.data.message, "success")
                
            } catch (e) {
                console.error(e)
            } finally {

            }
        },
        [request]
    )

    const renderContent = useCallback(
        (key: string, user: any) => {
            switch (key) {
                case "name": case "iss": case "sub":
                    return user[key]
                case "iat":
                    return datetimeFormat(SecondsToMs(user[key]))
                case "":
                    return (
                        <UserRowActions user={user}/>
                    )
            }
        },
        []
    )


    useEffect(() => {
        fetch()
    }, [fetch])

    console.log(operators)

    return (
        <Page title={`Users (${users.length})`}>
                <Table
                data={users}
                isLoading={isLoading}
                tableConfig={defaultTableConfig}
                filtersConfig={defaultFiltersConfig}
                renderContent={renderContent}
                renderActions={
                    <Button isBlue onClick={() => setIsCreateActive(true)}>
                        Create user
                        <Icon icon={icons.plus} width={20} height={20} />
                    </Button>
                }
                />
                {isCreateActive && (
                <CreateUserModal
                    error={error}
                    onSubmit={onUserSubmit}
                    onClose={() => setIsCreateActive(false)}
                    operatorList={operators}
                />
            )}
        
        
        

        </Page>
    )
}

export default Users