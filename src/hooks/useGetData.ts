import {workWithAPI} from '../api/api';
import {useEffect, useState} from 'react';
import {DataType, DeleteById} from "../models/data";
import {workWithLS} from "../utils/workWithLocalStorage";
import {ARTICLE_LS_KEY, DELETED_ID_KEYS, ORIGINAL_DATA_KEY, PAGE_KEY, PAGES_AMOUNT} from "../utils/constants";
import {helpers, roundUpArrayLength} from "../utils/helpers";
import {NavigationModel, NavigationVariables} from "../models/navigation";

type useGetDataType = {
    navigate: NavigationVariables;
    data: DataType;
    loading: boolean;
    deleteCardById: DeleteById,
    update: ({text, id}: { text: string, id: number }) => void;
    isError: boolean;
    isPrevButtonDisable: boolean;
    isNextButtonDisable: boolean;
}

export const useGetData = (): useGetDataType => {
    const [originalData, setOriginalData] = useState<DataType>([]);
    const [data, setData] = useState<DataType>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isPrevButtonDisable, setIsPrevButtonDisable] = useState(true);
    const [isNextButtonDisable, setIsNextButtonDisable] = useState(true);

    const removedIds: number[] = workWithLS.getData(DELETED_ID_KEYS) || [];

    useEffect(() => {
        const pageNumber: number = workWithLS.getData(PAGE_KEY) || (workWithLS.setData(PAGE_KEY, PAGES_AMOUNT), PAGES_AMOUNT);
        const dataFromLS = workWithLS.getData(ARTICLE_LS_KEY) as DataType || [];
        const dataOriginalFromLS = (workWithLS.getData(ORIGINAL_DATA_KEY) as DataType)?.filter((item) => !removedIds.includes(item.id));

        if (originalData.length === 0 && dataOriginalFromLS?.length > 0) {
            setOriginalData(dataOriginalFromLS);
        }

        if (dataFromLS?.length > 0) {
            setData(dataFromLS);
            setLoading(false);
            workWithNavigationButtons(roundUpArrayLength(dataOriginalFromLS), workWithLS.getData(PAGE_KEY) as number)
        } else {
            (async () => {
                try {
                    const getOriginal = helpers((await workWithAPI.getData()).data as DataType);
                    workWithNavigationButtons(roundUpArrayLength(getOriginal), workWithLS.getData(PAGE_KEY) as number)
                    setOriginalData(getOriginal);
                    workWithLS.setData(ORIGINAL_DATA_KEY, getOriginal);
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
        }
    }, []);


    const navigate = (direction: NavigationModel) => {
        const pageNumber: number = workWithLS.getData(PAGE_KEY) || 0;
        const dataWithId = originalData
            .filter((item) => !removedIds.includes(item.id));
        const roundedArrayLength = roundUpArrayLength(dataWithId)

        if (direction === NavigationModel.next) {
            const nextPages = pageNumber + PAGES_AMOUNT;

            workWithNavigationButtons(roundedArrayLength, nextPages);

            if (nextPages <= roundedArrayLength) {
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

            workWithNavigationButtons(roundedArrayLength, previousPages);

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
    }

    const workWithNavigationButtons = (maxValueOfArray: number, page: number) => {
        if (page > PAGES_AMOUNT && page < maxValueOfArray) {
            setIsPrevButtonDisable(false);
            setIsNextButtonDisable(false);
        } else if (page <= PAGES_AMOUNT) {
            setIsPrevButtonDisable(true);
            setIsNextButtonDisable(false);
        } else {
            setIsNextButtonDisable(true);
            setIsPrevButtonDisable(false);
        }
    }

    const deleteCardById = (id: number) => {
        const pageNumber: number = workWithLS.getData(PAGE_KEY) || 0;

        if (!removedIds) {
            workWithLS.setData(DELETED_ID_KEYS, [id]);
        } else {
            workWithLS.setData(DELETED_ID_KEYS, [...removedIds, id]);
        }

        const currentDeletedIds: number[] | undefined = workWithLS.getData(DELETED_ID_KEYS);
        const filteredData = originalData
            .filter((item) => !currentDeletedIds!.includes(item.id))
            .filter((_, index) => index <= pageNumber - 1 && index > pageNumber - PAGES_AMOUNT - 1);

        if (filteredData.length > 0) {
            setData(filteredData);
            workWithLS.setData(ARTICLE_LS_KEY, filteredData);
        }

        if (filteredData.length === 0 && pageNumber !== PAGES_AMOUNT) {
            navigate(NavigationModel.previous)
        }
    }

    const update = ({text, id}: { text: string; id: number }) => {
        const updatedData = data.map((item) => item.id === id ? ({...item, title: text}) : item);
        workWithLS.setData(ARTICLE_LS_KEY, updatedData);
        setData(updatedData);
    }

    return {data, loading, navigate, deleteCardById, update, isError, isPrevButtonDisable, isNextButtonDisable};
};
