import axios, {AxiosResponse} from 'axios';

const URL = 'https://storage.googleapis.com/aller-structure-task/article_list.json';

type WorkWithAPI = {
    getData: <T extends []>() => Promise<AxiosResponse<T>>
}

export const workWithAPI: WorkWithAPI = {
    getData: () => axios(URL),
};
