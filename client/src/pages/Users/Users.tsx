import React, { useCallback, useContext, useEffect, useState } from 'react'
import Page from '../../components/Page/Page'
import { UserType } from '../../utils/axios'
import { fetchUsers } from '../../utils/common'
import { AppContext } from '../../context/AppContextProvider'

export type UsersExtention = { operator: string, account: string }
export type ExtendedUserType = UserType & UsersExtention

const Users = () => {

    const { request } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<ExtendedUserType[]>([])


    const fetch = useCallback(
        async () => {
            setIsLoading(true);

            try {

                const users = await fetchUsers()

                setUsers(users)

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        },
        [request]
    );

    useEffect(() => {
        fetch()
    }, [fetch])

    return (
        <Page title='Users'>Content here</Page>
    )
}

export default Users