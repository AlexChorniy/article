import { Data, DataType, InitialData } from '../models/data';
import { DELETED_ID_KEYS, PAGE_KEY, PAGES_AMOUNT } from './constants';
import { workWithLS } from './workWithLocalStorage';

export const helpers = (data: InitialData[]): Data[] => data.map((item, index) => ({ id: index, ...item }));

export const roundUpArrayLength = <T>(arr: T[]): number => Math.ceil(arr.length / PAGES_AMOUNT) * PAGES_AMOUNT;

export const workWithData = (
  data: DataType,
  option?:
    | 'filterByRemovedIdsAndByPageNumber'
    | 'filterByRemovedIds'
    | 'filterByNextPage'
    | 'filterByPreviousPage'
    | 'filterByRemovedIdsAndFilterByDeletePages'
): DataType => {
  const getPageKey: number | undefined = workWithLS.getData(PAGE_KEY);

  const removedIds: number[] = workWithLS.getData(DELETED_ID_KEYS) || [];
  const pageNumber: number = getPageKey || (workWithLS.setData(PAGE_KEY, PAGES_AMOUNT), PAGES_AMOUNT);

  const pageNumberNavigation: number = getPageKey || 0;
  const nextPages = pageNumberNavigation + PAGES_AMOUNT;
  const previousPages = pageNumberNavigation - PAGES_AMOUNT;

  switch (option) {
    case 'filterByRemovedIdsAndByPageNumber':
      return data
        .filter((item) => !removedIds.includes(item.id))
        .filter((_, index) => index <= pageNumber - 1 && index > pageNumber - PAGES_AMOUNT - 1);
    case 'filterByRemovedIds':
      return data.filter((item) => !removedIds.includes(item.id));
    case 'filterByNextPage':
      return data.filter((_, index) => index >= nextPages - PAGES_AMOUNT && index < nextPages);
    case 'filterByPreviousPage':
      return data.filter((_, index) => index <= previousPages - 1 && index > previousPages - PAGES_AMOUNT - 1);
    case 'filterByRemovedIdsAndFilterByDeletePages':
      return data
        .filter((item) => !removedIds.includes(item.id))
        .filter((_, index) => index <= pageNumberNavigation - 1 && index > pageNumberNavigation - PAGES_AMOUNT - 1);
    default:
      return data;
  }
};
