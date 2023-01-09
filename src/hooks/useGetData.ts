import {workWithAPI} from '../api/api';
import {useEffect, useState} from 'react';
import {DataType, DeleteById} from "../models/data";
import {workWithLS} from "../utils/workWithLocalStorage";
import {ARTICLE_LS_KEY, DELETED_ID_KEYS, PAGE_KEY, PAGES_AMOUNT} from "../utils/constants";
import {addIdToData, roundUpArrayLength} from "../utils/addIdToData";
import {NavigationModel, NavigationVariables} from "../models/navigation";

type useGetDataType = {
    navigate: NavigationVariables;
    data: DataType;
    loading: boolean,
    deleteCardById: DeleteById,
    update: ({text, id}: { text: string, id: number }) => void;
    isError: boolean;
}

export const useGetData = (): useGetDataType => {
    const [originalData, setOriginalData] = useState<DataType>([]);
    const [data, setData] = useState<DataType>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const removedIds: number[] = workWithLS.getData(DELETED_ID_KEYS) || [];


    useEffect(() => {
        const pageNumber: number = workWithLS.getData(PAGE_KEY) || (workWithLS.setData(PAGE_KEY, PAGES_AMOUNT), PAGES_AMOUNT);
        const dataFromLS = workWithLS.getData(ARTICLE_LS_KEY) as DataType;
        if (!dataFromLS) {
            (async () => {
                try {
                    const getOriginal = addIdToData((await workWithAPI.getData()).data as DataType);
                    setOriginalData(getOriginal);
                    const filteredData = getOriginal
                        .filter((item) => !removedIds.includes(item.id))
                        .filter((_, index) => index <= pageNumber - 1 && index > pageNumber - PAGES_AMOUNT - 1)
                    if (filteredData.length > 0) {
                        setData(filteredData);
                        setLoading(false);
                        workWithLS.setData(ARTICLE_LS_KEY, filteredData);
                    }
                } catch (e) {
                    if (e) {
                        setIsError(true);
                        setLoading(false);
                    }
                    console.log(e);
                }
            })()
        } else {
            setData(dataFromLS);
            setLoading(false);
        }

    }, []);


    const navigate = async (direction: NavigationModel) => {
        const pageNumber: number = workWithLS.getData(PAGE_KEY) || 0;
        try {
            const dataWithId = originalData
                .filter((item) => !removedIds.includes(item.id));

            if (direction === NavigationModel.next) {
                const nextPages = pageNumber + PAGES_AMOUNT;

                if (nextPages <= roundUpArrayLength(dataWithId)) {
                    workWithLS.setData(PAGE_KEY, nextPages);
                }

                const filteredData = dataWithId
                    .filter((_, index) => index >= nextPages - PAGES_AMOUNT && index < nextPages);

                if (filteredData.length > 0) {
                    setData(filteredData);
                    setLoading(false);
                    workWithLS.setData(ARTICLE_LS_KEY, filteredData);
                }

            } else {
                const previousPages = pageNumber - PAGES_AMOUNT;

                if (previousPages > 0) {
                    workWithLS.setData(PAGE_KEY, previousPages);
                }

                const filteredData = dataWithId.filter((_, index) => index <= previousPages - 1 && index > previousPages - PAGES_AMOUNT - 1);

                if (filteredData.length > 0) {
                    setData(filteredData);
                    setLoading(false);
                    workWithLS.setData(ARTICLE_LS_KEY, filteredData);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const deleteCardById = async (id: number) => {
        const pageNumber: number = workWithLS.getData(PAGE_KEY) || 0;

        if (!removedIds) {
            workWithLS.setData(DELETED_ID_KEYS, [id]);
        } else {
            workWithLS.setData(DELETED_ID_KEYS, [...removedIds, id]);
        }

        try {
            const currentDeletedIds: number[] | undefined = workWithLS.getData(DELETED_ID_KEYS);
            const filteredData = originalData
                .filter((item) => !currentDeletedIds!.includes(item.id))
                .filter((_, index) => index <= pageNumber - 1 && index > pageNumber - PAGES_AMOUNT - 1);
            setData(filteredData);
            workWithLS.setData(ARTICLE_LS_KEY, filteredData);
        } catch (e) {
            console.log(e);
        }
    }

    const update = ({text, id}: { text: string; id: number }) => {
        const updatedData = data.map((item) => item.id === id ? ({...item, title: text}) : item);
        workWithLS.setData(ARTICLE_LS_KEY, updatedData);
        setData(updatedData);
    }

    return {data, loading, navigate, deleteCardById, update, isError};
};
