import { Data, InitialData } from '../models/data';
import { PAGES_AMOUNT } from './constants';

export const addIdToData = (data: InitialData[]): Data[] => data.map((item, index) => ({ id: index, ...item }));

export const roundUpArrayLength = <T>(arr: T[]): number => Math.ceil(arr.length / PAGES_AMOUNT) * PAGES_AMOUNT;
