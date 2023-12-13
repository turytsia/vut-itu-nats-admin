/**
 * @fileoverview Request protocol implementation
 *
 * This file contains implementation of a request protocol.
 * Request protocol is the object that helps to make requests to
 * a backend.
 *
 * @module axios
 *
 * @author xturyt00
 */
import axios, {AxiosError} from "axios";
import { RequestDashboardType } from "./types";

type ResponseStatusType = "error" | "success"

type ResponseMessageType = {
    type: ResponseStatusType
    message: string
}

type ResponseType = {
    type: ResponseStatusType
    data: any
}

/**
 * Request body to add an operator to the store
 *
 * @see http://localhost:8080/docs/index.html#/Operator/post_operator
 */
export type OperatorPayloadType = {
    "name": string,
    "force": boolean,
    "generate_signing_key": boolean,
    "expiry": string | null,
    "start": string | null,
    "sys": boolean
}

export type NameType = {
    "name": string
}

export type NSCBaseType = NameType & {
    "iat": number
    "iss": string
    "jti": string
    "sub": string
}

/**
 * @todo
 */
export type OperatorType = NSCBaseType & {
    "nats": {
        "type": string,
        "version": number,
        "account_server_url"?: string,
        "signing_keys"?: string[],
        "tags"?: string[]
        "operator_service_urls"?: string[],
        "strict_signing_key_usage"?: boolean
        "system_account"?: string
    }
}

export type OperatorPatchType = {
    "account_jwt_server_url": string | null,
    "require_signing_keys": boolean,
    "rm_account_jwt_server_url": string | null,
    "rm_service_url": string | null,
    "rm_tag": string | null,
    "service_url": string | null,
    "system_account": string | null,
    "tag": string | null
}

/**
 * @todo
 */
export type AccountPayloadType = {
    "operator": string | null,
    "allow_pub": string | null,
    "allow_pub_response": string | null,
    "allow_pubsub": string | null,
    "allow_sub": string | null,
    "deny_pub": string | null,
    "deny_pubsub": string | null,
    "deny_sub": string | null,
    "expiry": string | null,
    "name": string | null,
    "public_key": string | null,
    "response_ttl": string | null,
    "start": string | null
}

export type UserPayload = {
    "account": string,
    "name": string
}

/**
 * @todo
 */
export type AccountType = NSCBaseType & {
    "nats": {
        "authorization": {
            "auth_users": string[]
        },
        "default_permissions": {
            "pub": {
                [key: string]: any
            },
            "sub": {
                [key: string]: any
            }
        },
        "description": string,
        "limits": {
            "conn": number,
            "data": number,
            "exports": number,
            "imports": number,
            "leaf": number,
            "payload": number,
            "subs": number,
            "wildcards": boolean
        },
        "type": string,
        "version": number
    },
}

export type AccountPatchType = {
    "conns": string | null,
    "data": string | null,
    "description": string | null,
    "disallow_bearer": boolean,
    "exports": string | null,
    "imports": string | null,
    "info_url": string | null,
    "js_consumer": string | null,
    "js_disk_storage": string | null,
    "js_max_ack_pending": string | null,
    "js_max_bytes_required": string | null,
    "js_max_disk_stream": string | null,
    "js_max_mem_stream": string | null,
    "js_mem_storage": string | null,
    "js_streams": string | null,
    "js_tier": string | null,
    "leaf_conns": string | null,
    "payload": string | null,
    "rm_js_tier": string | null,
    "rm_sk": string | null,
    "rm_tag": string | null,
    "subscriptions": string | null,
    "tag": string | null,
    "wildcard_exports": boolean
}

export type UserType = NSCBaseType & {
    "nats": {
        "data": number,
        "payload": number,
        "pub": {
            [key: string]: any
        },
        "sub": {
            [key: string]: any
        },
        "subs": number,
        "type": string,
        "version": number
    },
}

export type UserPatchType = {
    "allow_pub": string | null,
    "allow_pub_response": string | null,
    "allow_pubsub": string | null,
    "allow_sub": string | null,
    "bearer": true,
    "conn_type": string | null,
    "data": string | null,
    "deny_pub": string | null,
    "deny_pubsub": string | null,
    "deny_sub": string | null,
    "expiry": string | null,
    "locale": string | null,
    "payload": string | null,
    "response_ttl": string | null,
    "rm": string | null,
    "rm_conn_type": string | null,
    "rm_response_perms": string | null,
    "rm_source_network": string | null,
    "rm_tag": string | null,
    "rm_time": string | null,
    "source_network": string | null,
    "start": string | null,
    "subs": string | null,
    "tag": string | null,
    "time": string | null
}

export type ConsumerPayloadType = {
    "config": {
        "ack_policy": number | null,
        "ack_wait": number | null,
        "backoff": number[],
        "deliver_group": string | null,
        "deliver_policy": number | null,
        "deliver_subject": string | null,
        "description": string | null,
        "durable_name": string | null,
        "filter_subject": string | null,
        "flow_control": true,
        "headers_only": true,
        "idle_heartbeat": number | null,
        "inactive_threshold": number | null,
        "max_ack_pending": number | null,
        "max_batch": number | null,
        "max_bytes": number | null,
        "max_deliver": number | null,
        "max_expires": number | null,
        "max_waiting": number | null,
        "mem_storage": true,
        "name": string | null,
        "num_replicas": number | null,
        "opt_start_seq": number | null,
        "opt_start_time": string | null,
        "rate_limit_bps": number | null,
        "replay_policy": number | null,
        "sample_freq": string | null
    },
    "meta": {
        "account": string | null,
        "bucket_name": string | null,
        "operator": string | null,
        "server_url": string | null,
        "stream_name": string | null,
        "user": string | null
    }
}

export type UserKvPayloadType = {
    "config": {
        "bucket": string | null,
        "description": string | null,
        "history": number | null,
        "maxBytes": number | null,
        "maxValueSize": number | null,
        "mirror": {
            "external": {
                "api": string | null,
                "deliver": string | null
            },
            "filter_subject": string | null,
            "name": string | null,
            "opt_start_seq": number | null,
            "opt_start_time": string | null
        },
        "placement": {
            "cluster": string | null,
            "tags": string[]
        },
        "rePublish": {
            "dest": string | null,
            "headers_only": boolean,
            "src": string | null
        },
        "replicas": number | null,
        "sources": [
            {
                "external": {
                    "api": string | null,
                    "deliver": string | null
                },
                "filter_subject": string | null,
                "name": string | null,
                "opt_start_seq": number | null,
                "opt_start_time": string | null
            }
        ],
        "storage": number | null,
        "ttl": number | null
    },
    "meta": {
        "account": string | null,
        "bucket_name": string | null,
        "operator": string | null,
        "server_url": string | null,
        "stream_name": string | null,
        "user": string | null
    }
}

export type UserStreamPayloadType = {
    "config": {
        "allow_direct": boolean,
        "allow_rollup_hdrs": boolean,
        "deny_delete": boolean,
        "deny_purge": boolean,
        "description": string | null,
        "discard": number | null,
        "discard_new_per_subject": boolean,
        "duplicate_window": number | null,
        "max_age": number | null,
        "max_bytes": number | null,
        "max_consumers": number | null,
        "max_msg_size": number | null,
        "max_msgs": number | null,
        "max_msgs_per_subject": number | null,
        "mirror": {
            "external": {
                "api": string | null,
                "deliver": string | null
            },
            "filter_subject": string | null,
            "name": string | null,
            "opt_start_seq": number | null,
            "opt_start_time": string | null
        },
        "mirror_direct": boolean,
        "name": string | null,
        "no_ack": boolean,
        "num_replicas": number | null,
        "placement": {
            "cluster": string | null,
            "tags": string[]
        },
        "republish": {
            "dest": string | null,
            "headers_only": boolean,
            "src": string | null
        },
        "retention": number | null,
        "sealed": boolean,
        "sources": [
            {
                "external": {
                    "api": string | null,
                    "deliver": string | null
                },
                "filter_subject": string | null,
                "name": string | null,
                "opt_start_seq": number | null,
                "opt_start_time": string | null
            }
        ],
        "storage": number | null,
        "subjects": string[],
        "template_owner": string | null
    },
    "meta": {
        "account": string | null,
        "bucket_name": string | null,
        "operator": string | null,
        "server_url": string | null,
        "stream_name": string | null,
        "user": string | null
    }
}

export type SecretPayloadType = {
    "account": string | null,
    "namespace": string | null,
    "operator": string | null,
    "secret_name": string | null,
    "user": string | null
}

export type DataFlowType = {
    "name": string,
    "server": string,
    "created"?: string
}

/**
 * Request type template
 */
type RequestType<T extends Array<string | object>, S> = (...args: T) => Promise<S>

type GetConfigType = RequestType<[operator: string], string>
type PostConfigType = RequestType<[payload: { name: string, operator: string }], ResponseType>

type GetOperatorsType = RequestType<[], { operators: string[] }>
type GetOperatorType = RequestType<[operator: string], OperatorType>
type PostOperatorType = RequestType<[payload: OperatorPayloadType], ResponseType>
type PatchOperatorType = RequestType<[operator: string, payload: OperatorPatchType], ResponseType>

type GetAccountsType = RequestType<[operator: string], { accounts: string[] }>
type GetAccountType = RequestType<[operator: string, account: string], AccountType>
type GetBindOperatorType = RequestType<[], { [key: string]: string[] }>
type PostAccountType = RequestType<[operator: string, payload: AccountPayloadType], ResponseType>
type PatchAccountType = RequestType<[operator: string, account: string, payload: AccountPatchType], ResponseType>
type PostBindOperatorType = RequestType<[payload: { account: string, operator: string, server: string }], {
    [key: string]: string[]
}>
type PostPushAccountType = RequestType<[payload: { account: string, operator: string, server_list: string[] }], {
    [key: string]: string[]
}>
type GetDashboardType = RequestType<[], RequestDashboardType>
type PatchDashboardType = RequestType<[data: RequestDashboardType], ResponseType>

type GetUsersType = RequestType<[operator: string, account: string], { users: string[] }>
type GetUserType = RequestType<[operator: string, account: string, user: string], UserType>
type GetUserCredsType = RequestType<[operator: string, account: string, user: string], { [key: string]: string }>
type PostUserType = RequestType<[operator: string, account: string, payload: UserType], ResponseType>
type PatchUserType = RequestType<[operator: string, account: string, payload: UserPatchType], ResponseType>
type DeleteUserType = RequestType<[operator: string, account: string, user: string], { [key: string]: string }>
type DeleteDataflowType = RequestType<[dataflow: string], { [key: string]: string }>

type GetConsumersType = RequestType<[], ResponseType> // todo
type PostConsumerType = RequestType<[payload: ConsumerPayloadType], ResponseType>

type GetUserKvType = RequestType<[], ResponseType> // todo
type PostUserKvType = RequestType<[payload: UserKvPayloadType], ResponseType>

type GetUserStreamType = RequestType<[], ResponseType> // todo
type PostUserStreamType = RequestType<[payload: UserStreamPayloadType], ResponseType>

type PostSecretType = RequestType<[payload: SecretPayloadType], ResponseType>

type GetDataFlowType = RequestType<[], { [key: string]: DataFlowType[] | null }>
type PostDataFlowType = RequestType<[payload: DataFlowType], ResponseType>

type GetLocationType = RequestType<[location: string], any>

interface GetRequestActions {
    location: GetLocationType
    dashboard: GetDashboardType
    bind: GetBindOperatorType
    operators: GetOperatorsType
    operator: GetOperatorType
    accounts: GetAccountsType
    account: GetAccountType
    users: GetUsersType
    user: GetUserType
    creds: GetUserCredsType
    config: GetConfigType
    consumers: GetConsumersType
    kv: GetUserKvType
    streams: GetUserStreamType
    dataflows: GetDataFlowType
}

interface PostRequestActions {
    bind: PostBindOperatorType
    pushAccount: PostPushAccountType
    operator: PostOperatorType
    account: PostAccountType
    user: PostUserType
    config: PostConfigType
    consumer: PostConsumerType
    kv: PostUserKvType
    stream: PostUserStreamType
    secret: PostSecretType
    dataflows: PostDataFlowType
}

interface PatchRequestActions {
    dashboard: PatchDashboardType
    operator: PatchOperatorType
    account: PatchAccountType
    user: PatchUserType
}

interface DeleteRequestActions {
    user: DeleteUserType
    dataflow: DeleteDataflowType
}

interface RequestActions {
    get: GetRequestActions
    post: PostRequestActions
    patch: PatchRequestActions
    delete: DeleteRequestActions
}

const { get, post, put, patch, delete: adelete} = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Accept": "application/json"
    }
})

/**
 * @todo
 */
const GetRequest: GetRequestActions = {
    location: async (address: string) => {
        try {
            const { data } = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            );
            
            return data
        } catch (error) {
            console.error(error);
        }
    },
    dashboard: async () => {
        try {
            const { data } = await get("/dashboard");
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    operators: async () => {
        try {
            const {data} = await get("/operators");
            return data;
        } catch (error) {
            console.error(error);
        }
        return {operators: []};
    },
    operator: async (operator) => {
        try {
            const {data} = await get(`/operator/${operator}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    accounts: async (operator) => {
        try {
            const {data} = await get(`/operator/${operator}/accounts`);
            return data;
        } catch (error) {
            console.error(error);
        }
        return {accounts: []};
    },
    account: async (operator, account) => {
        try {
            const {data} = await get(`/operator/${operator}/account/${account}`);
            return data;
        } catch (error) {
            console.error(error);
        }
        return {};
    },
    users: async (operator, account) => {
        try {
            const {data} = await get(`/operator/${operator}/account/${account}/users`);
            return data;
        } catch (error) {
            console.error(error);
        }
        return {users: []};
    },
    user: async (operator, account, user) => {
        try {
            const {data} = await get(`/operator/${operator}/account/${account}/user/${user}`);
            return data;
        } catch (error) {
            console.error(error);
        }
        return {};
    },
    bind: function (): Promise<{ [key: string]: string[]; }> {
        throw new Error("Function not implemented.");
    },
    creds: function (operator: string, account: string, user: string): Promise<{ [key: string]: string; }> {
        throw new Error("Function not implemented.");
    },
    config: function (operator: string): Promise<string> {
        throw new Error("Function not implemented.");
    },
    consumers: function (): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    },
    kv: function (): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    },
    streams: function (): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    },
    dataflows: async (): Promise<{ [key: string]: DataFlowType[] | null; }> => {
        try {
            const {data} = await get(`/dataflows`);
            return data;
        } catch (error) {
            console.error(error);
        }
        return {};
    }
}

/**
 * @todo
 */
const PostRequest: PostRequestActions = {
    operator: async (payload) => {
        try {
            const response = await post("/operator", payload);
            return {type: "success", data: response.data};
        } catch (error) {
            const err = error as AxiosError;
            return {type: "error", data: err.response?.data};
        }
    },
    account: async (operator, payload) => {
        try {
            const response = await post(`/operator/${operator}/account`, payload);
            return {type: "success", data: response.data};
        } catch (error) {
            const err = error as AxiosError;
            return {type: "error", data: err.response?.data};
        }
    },
    user: async (operator, account, payload) => {
        try {
            const response = await post(`/operator/${operator}/account/${account}/user`, payload);
            return {type: "success", data: response.data};
        } catch (error) {
            const err = error as AxiosError;
            return {type: "error", data: err.response?.data};
        }
    },
    bind: function (payload: { account: string; operator: string; server: string; }): Promise<{
        [key: string]: string[];
    }> {
        throw new Error("Function not implemented.");
    },
    pushAccount: function (payload: { account: string; operator: string; server_list: string[]; }): Promise<{
        [key: string]: string[];
    }> {
        throw new Error("Function not implemented.");
    },
    config: function (payload: { name: string; operator: string; }): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    },
    consumer: function (payload: ConsumerPayloadType): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    },
    kv: function (payload: UserKvPayloadType): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    },
    stream: function (payload: UserStreamPayloadType): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    },
    secret: function (payload: SecretPayloadType): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    },
    dataflows: async (payload: DataFlowType): Promise<ResponseType> => {
        try {
            const response = await post(`/dataflows`, payload);
            return {type: "success", data: response.data};
        } catch (error) {
            const err = error as AxiosError;
            return {type: "error", data: err.response?.data};
        }
    }
}

/**
 * @todo
 */
const PatchRequest: PatchRequestActions = {
    dashboard: async (payload: RequestDashboardType) => {
        try {
            const response = await put(`/dashboard`, payload);
            return { type: "success", data: response.data };
        } catch (error) {
            const err = error as AxiosError;
            return { type: "error", data: err.response?.data };
        }
    },
    operator: async (operator: string, payload: OperatorPatchType): Promise<ResponseType> => {
        try {
            const response = await patch(`/operator/${operator}`, payload);
            return { type: "success", data: response.data };
        } catch (error) {
            const err = error as AxiosError;
            return { type: "error", data: err.response?.data };
        }
    },
    account: async (operator: string, account: string, payload: AccountPatchType): Promise<ResponseType> => {
        try {
            const response = await put(`/operator/${operator}/account/${account}`, payload);
            return {type: "success", data: response.data};
        } catch (error) {
            const err = error as AxiosError;
            return {type: "error", data: err.response?.data};
        }
    },
    user: function (operator: string, account: string, payload: UserPatchType): Promise<ResponseType> {
        throw new Error("Function not implemented.");
    }
}

/**
 * @todo
 */
const DeleteRequest: DeleteRequestActions = {
    user: function (operator: string, account: string, user: string): Promise<{ [key: string]: string; }> {
        throw new Error("Function not implemented.");
    },
    dataflow: async (name: string): Promise<ResponseType> => {
        try {
            const response = await adelete(`/dataflow/${name}`);
            return {type: "success", data: response.data};
        } catch (error) {
            const err = error as AxiosError;
            return {type: "error", data: err.response?.data};
        }
    }
}

/**
 * Request protocol
 *
 * Request protocol is the object that helps to make requests to
 * a backend.
 *
 * @example
 * const { operators } = await request.get.operators() // fetches requests
 */
class Request implements RequestActions {
    get: GetRequestActions = GetRequest
    post: PostRequestActions = PostRequest
    patch: PatchRequestActions = PatchRequest
    delete: DeleteRequestActions = DeleteRequest
}

export default Request
