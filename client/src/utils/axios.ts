import axios, { Axios, AxiosError, AxiosResponse } from "axios";

export type OperatorType = {
    iat: number
    iss: string
    jti: string
    name: string
    nats: {
        type: string,
        version: number,
        account_server_url?: string,
        signing_keys?: string[],
        tags?: string[]
    }
    sub: string
}



type ResponseType = {
    type: "error" | "success"
    data: any
}

type GetOperatorsType = () => Promise<{ operators: string[] }>
type GetOperatorByNameType = (operatorName: string) => Promise<OperatorType>
type GetAccountsType = (operatorName: string) => Promise<object>
type GetAccountByNameType = (operatorName: string, accountName: string) => Promise<object>
type GetUsersType = (operatorName: string, accountName: string) => Promise<object>
type GetUsersByNameType = (operatorName: string, accountName: string, userName: string) => Promise<object>

type PostOperatorType = (data: object) => Promise<ResponseType>
type PostAccountType = (operatorName: string, data: object) => Promise<object>
type PostUserType = (operatorName: string, accountName: string, data: object) => Promise<object>

interface GetRequestActions {
    operators: GetOperatorsType
    operator: GetOperatorByNameType
    accounts: GetAccountsType
    account: GetAccountByNameType
    users: GetUsersType
    user: GetUsersByNameType
}

interface PostRequestActions {
    operator: PostOperatorType
    account: PostAccountType
    user: PostUserType
}

interface RequestActions {
    get: GetRequestActions
    post: PostRequestActions
}

const { get, post } = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Accept": "application/json"
    }
})

const GetRequest: GetRequestActions = {
    operators: async () => {
        try {
            const { data } = await get("/operators")
            return data
        } catch (error) {
            console.error(error)
        }
    },
    operator: async (operatorName) => {
        try {
            const { data } = await get("/operator/" + operatorName)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    accounts: async () => {
        return {}
    },
    account: async () => {
        return {}
    },
    users: async () => {
        return {}
    },
    user: async () => {
        return {}
    },
}

const PostRequest: PostRequestActions = {
    operator: async (data) => {
        try {
            const response = await post("/operator", data)
            return { type: "success", data: response.data }
        } catch (error) {
            const err = error as AxiosError
            return { type: "error", data: err.response?.data }
        }
    },
    account: async () => {
        return {}
    },
    user: async () => {
        return {}
    },
}

class Request implements RequestActions {
    get: GetRequestActions = GetRequest
    post: PostRequestActions = PostRequest
}

export default Request