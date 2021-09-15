import { PageEvent } from './index';
export interface Pagination {
  totalLength: number;
  pageItems: number;
  pageIndex: number;
  pageEvent?: PageEvent;
}
