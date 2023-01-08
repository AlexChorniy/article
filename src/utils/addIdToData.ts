import { Data, InitialData } from '../models/data';

export const addIdToData = (data: InitialData[]): Data[] => data.map((item, index) => ({ id: index, ...item }));
