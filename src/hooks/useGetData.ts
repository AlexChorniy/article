import {workWithAPI} from '../api/api';
import {useEffect, useState} from 'react';
import {DataType, DeleteById} from "../models/data";
import {workWithLS} from "../utils/workWithLocalStorage";
import {ARTICLE_LS_KEY, DELETED_ID_KEYS, ORIGINAL_DATA_KEY, PAGE_KEY, PAGES_AMOUNT} from "../utils/constants";
import {helpers, roundUpArrayLength, workWithData} from "../utils/helpers";
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

    useEffect(() => {
        const dataFromLS = workWithLS.getData(ARTICLE_LS_KEY) as DataType || [];
        const dataOriginalFromLS = workWithData((workWithLS.getData(ORIGINAL_DATA_KEY) as DataType || []), 'filterByRemovedIds');

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

                    const filteredData = workWithData(getOriginal, 'filterByRemovedIdsAndByPageNumber');

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
        const dataWithId = workWithData(originalData, 'filterByRemovedIds');
        const roundedArrayLength = roundUpArrayLength(dataWithId);

        if (direction === NavigationModel.next) {
            const nextPages = pageNumber + PAGES_AMOUNT;

            workWithNavigationButtons(roundedArrayLength, nextPages);

            if (nextPages <= roundedArrayLength) {
                workWithLS.setData(PAGE_KEY, nextPages);
            }

            const filteredData = workWithData(dataWithId, 'filterByNextPage');

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

            const filteredData = workWithData(dataWithId, 'filterByPreviousPage');

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
        const removedIds: number[] = workWithLS.getData(DELETED_ID_KEYS) || [];

        if (!removedIds) {
            workWithLS.setData(DELETED_ID_KEYS, [id]);
        } else {
            workWithLS.setData(DELETED_ID_KEYS, [...removedIds, id]);
        }

        const filteredData = workWithData(originalData, 'filterByRemovedIdsAndFilterByDeletePages');

        if (filteredData.length > 0) {
            setData(filteredData);
            workWithLS.setData(ARTICLE_LS_KEY, filteredData);
        }

        if (filteredData.length === 0 && pageNumber !== PAGES_AMOUNT) {
            navigate(NavigationModel.previous)
            workWithNavigationButtons(roundUpArrayLength(filteredData), workWithLS.getData(PAGE_KEY) as number)
        }
    }

    const update = ({text, id}: { text: string; id: number }) => {
        const updatedOriginal = workWithData((workWithLS.getData(ORIGINAL_DATA_KEY) as DataType || []), 'updateByIdAndText', {
            id,
            text
        })
        const updatedData = workWithData(data, 'updateByIdAndText', {id, text});
        workWithLS.setData(ARTICLE_LS_KEY, updatedData);
        workWithLS.setData(ORIGINAL_DATA_KEY, updatedOriginal);
        setData(updatedData);
        setOriginalData(updatedOriginal);
    }

    return {data, loading, navigate, deleteCardById, update, isError, isPrevButtonDisable, isNextButtonDisable};
};
