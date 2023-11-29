import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";
import {Icon} from "@iconify/react";
import icons from "../../utils/icons";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContextProvider";
import {DataFlowType} from "../../utils/axios";
import Details from "../../components/Details/Details";
import AddDataFlowContext from "./modals/AddDataFlowContextModal";
import DataflowWindow from "./components/DataflowWindow";

const DataFlowsDetails = () => {
    const {request} = useContext(AppContext)

    const [dataFlows, setDataFlows] = useState<DataFlowType[]>([])
    const [isEditModal, setIsEditModal] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [dataFlowIndex, setDataFlowIndex] = useState<number>(0)

    const onChangeInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    )

    const fetchDataFlows = useCallback(
        async () => {
            try {
                const response = await request.get.dataflows();
                if (response["dataflows"] === undefined) return;
                setDataFlows(response["dataflows"]);
            } catch (e) {
                console.error(e);
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
        async (df: DataFlowType) => {
            try {
                await request.post.dataflows(df);
                await fetchDataFlows();
                setIsEditModal(false);
            } catch (e) {
                console.error(e);
            }
        },
        [fetchDataFlows, request]
    )

    const getDataflow = useCallback(
        (index: number) => {
            if (dataFlows.length <= index) return null
            return dataFlows[index]
        },
        [dataFlows]
    )

    const handleDelete = useCallback(
        async (name: string, _: number) => {
            try {
                await request.delete.dataflow(name);
                await fetchDataFlows();
            } catch (e) {
                console.error(e);
            }
        },
        [fetchDataFlows, request]
    )

    useEffect(() => {
        fetchDataFlows();
    }, [fetchDataFlows])

    return (
        <Page title={"Data flows"}>
            <Details
                sectionChangeCb={handleSectionChange}
                renderActions={
                    <Button isBlue onClick={() => setIsEditModal(true)}>
                        New data flow
                        <Icon icon={icons.pen} width={20} height={20}/>
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
            >
                {
                    getDataflow(dataFlowIndex) ?
                        <DataflowWindow
                            server={dataFlows[dataFlowIndex]?.server}
                        ></DataflowWindow>
                        : <div></div>
                }
            </Details>
            {(isEditModal) && (
                <AddDataFlowContext
                    onSubmit={onContextCreation}
                    onClose={() => setIsEditModal(false)}
                />
            )}
        </Page>
    )
}

export default DataFlowsDetails
