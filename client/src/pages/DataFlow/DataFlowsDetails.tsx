import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, notify } from "../../context/AppContextProvider";
import { DataFlowType } from "../../utils/axios";
import Details from "../../components/Details/Details";
import AddDataFlowContext from "./modals/AddDataFlowContextModal";
import DataflowWindow from "./components/DataflowWindow";
import { DataFlowContextFormType } from "../../utils/types";
import { dataflowContextToServerUrl } from "../../utils/common";

const DataFlowsDetails = () => {
    const { request, isLoading, setIsLoading } = useContext(AppContext)

    const [error, setError] = useState("")
    const [dataFlows, setDataFlows] = useState<DataFlowType[]>([])
    const [search, setSearch] = useState<string>("")
    const [currentLocationName, setCurrentLocationName] = useState<string>("")
    const [dataFlowIndex, setDataFlowIndex] = useState<number>(0)
    const [isCreateModal, setIsCreateModal] = useState<boolean>(false)
    const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false)

    const onChangeInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    )

    const fetchDataFlows = useCallback(
        async () => {
            setIsLoading(true)
            try {
                const response = await request.get.dataflows();

                if (response["dataflows"] === undefined) return;
                setDataFlows(response["dataflows"] ?? []);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false)
            }
        },
        [request]
    )

    const handleSectionChange = useCallback(
        (index: number) => {
            setDataFlowIndex(index)

        },
        []
    )

    const onContextCreation = useCallback(
        async (dataflowContext: DataFlowContextFormType) => {
            setIsLoading(true)

            try {
                const data = await request.get.location(dataflowContext.location);

                const results = data.results

                if (!(results && results.length > 0)) {
                    setError("Error: Server location was not found.")
                    return
                } else {
                    setError("")
                }

                const { lat, lng } = results[0].geometry.location;
                console.log(lat, lng)

                const dataflow: DataFlowType = {
                    name: dataflowContext.name,
                    server: dataflowContextToServerUrl(dataflowContext),
                    lat,
                    lon: lng
                }

                const response = await request.post.dataflows(dataflow);
                await fetchDataFlows();
                setIsCreateModal(false);
                notify(response.data.message, response.type)
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false)
            }
        },
        [fetchDataFlows, request]
    )

    const onContextUpdate = async (dataflowContext: DataFlowContextFormType) => {
        setIsLoading(true)

        try {
            const data = await request.get.location(dataflowContext.location);

            const results = data.results

            if (!(results && results.length > 0)) {
                setError("Error: Server location was not found.")
                return
            } else {
                setError("")
            }

            const { lat, lng } = results[0].geometry.location;

            const dataflow: DataFlowType = {
                name: dataflowContext.name,
                server: dataflowContextToServerUrl(dataflowContext),
                lat,
                lon: lng
            }

            const response = await request.patch.dataflows(dataflow);
            await fetchDataFlows();
            setIsUpdateModal(false);
            notify(response.data.message, "success")
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false)
        }
    }

    const getLocationName = async (lat: number, lng: number) => {
        setIsLoading(true)
        try {
            const data = await request.get.reverseLocation(lat, lng);

            if (data.results.length === 0) return ""

            return data.results[0].formatted_address;
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

    const getDataflow = useCallback(
        (index: number) => {
            if (dataFlows.length <= index) return null
            return dataFlows[index]
        },
        [dataFlows]
    )

    const handleDelete = useCallback(
        async (name: string, _: number) => {
            setIsLoading(true)
            try {
                const response = await request.delete.dataflow(name);
                await fetchDataFlows();

                // notify(response.data.message, "success")
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false)
            }
        },
        [fetchDataFlows, request]
    )

    const openUpdateHandler = async () => {

        try {
            const name = await getLocationName(dataFlows[dataFlowIndex].lat, dataFlows[dataFlowIndex].lon)
    
            setCurrentLocationName(name)
    
            setIsUpdateModal(true)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        fetchDataFlows();
    }, [fetchDataFlows])

    return (
        <Page title={"Data flows"}>
            <Details
                sectionChangeCb={handleSectionChange}
                renderActions={
                    <Button isBlue onClick={() => setIsCreateModal(true)}>
                        New data flow
                        <Icon icon={icons.plus} width={20} height={20} />
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
                detailsConfig={
                    dataFlows.map((df) => {
                        return {
                            title: {
                                value: df.name,
                                icon: icons.chat
                            },
                            attributes: [
                                {
                                    name: "Name",
                                    value: df.name,
                                },
                                {
                                    name: "Server",
                                    value: df.server,
                                },
                            ]
                        }
                    })
                }
                deletable={{
                    isDeletable: true,
                    onDelete: handleDelete
                }}
                editConfig={{
                    onUpdate: openUpdateHandler
                }}
            >
                {getDataflow(dataFlowIndex) && (
                    <DataflowWindow
                        server={dataFlows[dataFlowIndex]?.server}
                        name={dataFlows[dataFlowIndex]?.name}
                    />
                )}
            </Details>
            {(isCreateModal) && (
                <AddDataFlowContext
                    icon={icons.plus}
                    title="New Data Flow Context"
                    textProceed="Add"
                    error={error}
                    onSubmit={onContextCreation}
                    onClose={() => setIsCreateModal(false)}
                />
            )}
            {(isUpdateModal) && (
                <AddDataFlowContext
                    disableName
                    icon={icons.pen}
                    title="Update Data Flow Context"
                    textProceed="Update"
                    defaultForm={{
                        name: dataFlows[dataFlowIndex]?.name ?? "",
                        server: new URL(dataFlows[dataFlowIndex]?.server).hostname,
                        port: new URL(dataFlows[dataFlowIndex]?.server).port,
                        protocol: new URL(dataFlows[dataFlowIndex]?.server).protocol + "//",
                        location: currentLocationName
                    }}
                    error={error}
                    onSubmit={onContextUpdate}
                    onClose={() => setIsUpdateModal(false)}
                />
            )}
        </Page>
    )
}

export default DataFlowsDetails
