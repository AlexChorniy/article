import { Data, DataType, InitialData } from '../models/data';
import { DELETED_ID_KEYS, PAGE_KEY, PAGES_AMOUNT } from './constants';
import { workWithLS } from './workWithLocalStorage';

export const helpers = (data: InitialData[]): Data[] => data.map((item, index) => ({ id: index, ...item }));

export const roundUpArrayLength = <T>(arr: T[]): number => Math.ceil(arr.length / PAGES_AMOUNT) * PAGES_AMOUNT;

export const workWithData = (
  data: DataType,
  option?: 'filterByRemovedIdsAndByPageNumber' | 'filterByRemovedIds'
): DataType => {
  const removedIds: number[] = workWithLS.getData(DELETED_ID_KEYS) || [];
  const pageNumber: number = workWithLS.getData(PAGE_KEY) || (workWithLS.setData(PAGE_KEY, PAGES_AMOUNT), PAGES_AMOUNT);

  switch (option) {
    case 'filterByRemovedIdsAndByPageNumber':
      return data
        .filter((item) => !removedIds.includes(item.id))
        .filter((_, index) => index <= pageNumber - 1 && index > pageNumber - PAGES_AMOUNT - 1);
    case 'filterByRemovedIds':
      return data.filter((item) => !removedIds.includes(item.id));
    default:
      return data;
  }
};
