import {workWithAPI} from '../api/api';
import {useEffect, useState} from 'react';
import {Data, DataType} from "../models/data";
import {workWithLS} from "../utils/workWithLocalStorage";
import {ARTICLE_LS_KEY} from "../utils/constants";
import {addIdToData} from "../utils/addIdToData";
import {NavigationModel, NavigationR} from "../models/navigation";

export const useGetData = (): { navigate: NavigationR; data: Data[] | []; loading: boolean } => {
    const [data, setData] = useState<DataType>([]);
    const [loading, setLoading] = useState(true);

    const dataFromLS = workWithLS.getData(ARTICLE_LS_KEY);

    useEffect(() => {
        if (!dataFromLS) {
            workWithAPI
                .getData()
                .then((res) => {
                    const dataWithId = addIdToData(res.data as Data[]).filter(({id}) => id <= 10);

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

    const navigate = (direction: NavigationModel) => {
        const firstId = data[0].id;
        const lastId = data[data.length - 1].id;
        setLoading(true);
        
        if (direction === NavigationModel.next) {
            workWithAPI
                .getData()
                .then((res) => {
                    const dataWithId = addIdToData(res.data as Data[]).filter(({id}) => id >= lastId + 1 && id < lastId + 11);
                    if (dataWithId.length > 0) {
                        setData(dataWithId);
                        setLoading(false);
                        workWithLS.setData(ARTICLE_LS_KEY, dataWithId);
                    }
                })
                .catch((error) => console.log(error))
        } else {
            workWithAPI
                .getData()
                .then((res) => {
                    const dataWithId = addIdToData(res.data as Data[]).filter(({id}) => id <= firstId - 1 && id > firstId - 11);
                    if (dataWithId.length > 0) {
                        setData(dataWithId);
                        setLoading(false);
                        workWithLS.setData(ARTICLE_LS_KEY, dataWithId);
                    }
                })
                .catch((error) => console.log(error))
        }
    }

    return {data, loading, navigate};
};
