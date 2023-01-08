import {workWithAPI} from '../api/api';
import {useEffect, useState} from 'react';
import {Data, DataType, DeleteById} from "../models/data";
import {workWithLS} from "../utils/workWithLocalStorage";
import {ARTICLE_LS_KEY, DELETED_ID_KEYS, PAGE_KEY, PAGES_AMOUNT} from "../utils/constants";
import {addIdToData} from "../utils/addIdToData";
import {NavigationModel, NavigationVariables} from "../models/navigation";

type useGetDataType = { navigate: NavigationVariables; data: Data[] | []; loading: boolean, deleteCardById: DeleteById }

export const useGetData = (): useGetDataType => {
    const [data, setData] = useState<DataType>([]);
    const [loading, setLoading] = useState(true);

    const dataFromLS = workWithLS.getData(ARTICLE_LS_KEY);


    useEffect(() => {
        workWithLS.setData(PAGE_KEY, 10);

        if (!dataFromLS) {
            workWithAPI
                .getData()
                .then((res) => {
                    const pageNumber: number = workWithLS.getData(PAGE_KEY) || 0;
                    const dataWithId = addIdToData(res.data as Data[]).filter((_, index) => index <= pageNumber - 1 && index > pageNumber - 11);

                    if (dataWithId.length > 0) {
                        setData(dataWithId);
                        setLoading(false);
                        workWithLS.setData(ARTICLE_LS_KEY, dataWithId);
                    }

                })
                .catch((error) => console.log(error));
        } else {
            setData(dataFromLS as Data[]);
            setLoading(false);
        }
    }, []);

    const navigate = async (direction: NavigationModel) => {
        const pageNumber: number = workWithLS.getData(PAGE_KEY) || 0;
        const dataWithId = addIdToData((await workWithAPI.getData()).data as Data[] | []);
        setLoading(true);

        if (direction === NavigationModel.next) {
            const nextPages = pageNumber + PAGES_AMOUNT;
            if (nextPages <= Math.ceil(dataWithId.length / PAGES_AMOUNT) * PAGES_AMOUNT) {
                workWithLS.setData(PAGE_KEY, nextPages);
            }

            try {
                const filteredData = dataWithId.filter((_, index) => index >= nextPages - PAGES_AMOUNT && index < nextPages);
                if (filteredData.length > 0) {
                    setData(filteredData);
                    setLoading(false);
                    workWithLS.setData(ARTICLE_LS_KEY, filteredData);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            const previousPages = pageNumber - PAGES_AMOUNT;
            if (previousPages > 0) {
                workWithLS.setData(PAGE_KEY, previousPages);
            }

            try {
                const filteredData = dataWithId.filter((_, index) => index <= previousPages - 1 && index > previousPages - PAGES_AMOUNT - 1);
                if (filteredData.length > 0) {
                    setData(filteredData);
                    setLoading(false);
                    workWithLS.setData(ARTICLE_LS_KEY, filteredData);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    const deleteCardById = async (id: number) => {
        const data = workWithLS.getData(DELETED_ID_KEYS) as [];
        if (!data) {
            workWithLS.setData(DELETED_ID_KEYS, [id]);

        }
        workWithLS.setData(DELETED_ID_KEYS, [...data, id]);
        try {
            const response = await workWithAPI.getData();
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }

        setData((prev) => prev.filter((item) => item.id !== id));
    }

    return {data, loading, navigate, deleteCardById};
};
