import axios, { AxiosResponse } from 'axios';

const URL = 'https://storage.googleapis.com/aller-structure-task/article_list.json';

export const workWithAPI: Record<string, <T extends []>(v?: string) => Promise<AxiosResponse<T>>> = {
  getData: () => axios(URL),
};
