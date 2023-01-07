import { workWithAPI } from '../api/api';
import { useEffect, useState } from 'react';
import {Data} from "../models/data";
import {workWithLS} from "../utils/workWithLocalStorage";
import {ARTICLE_LS_KEY} from "../utils/constants";
import {addIdToData} from "../utils/addIdToData";

export const useGetData = (): { data: Data[] | [], loading: boolean } => {
  const [data, setData] = useState<Data[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const dataFromLS = workWithLS.getData(ARTICLE_LS_KEY);
      if(!dataFromLS) {
          workWithAPI
              .getData()
              .then((res) => {
                  setData(addIdToData(res.data as Data[]));
                  setLoading(false);
                  workWithLS.setData(ARTICLE_LS_KEY, res.data);
              })
              .catch((error) => error.log);
      } else {
          setData(dataFromLS as Data[]);
          setLoading(false);
      }
  }, []);

  return { data, loading };
};
