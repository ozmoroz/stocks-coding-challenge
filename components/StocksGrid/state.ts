import { StockData } from 'interfaces/StockData';

/// Number to stocks show per page
export const STOCKS_PER_PAGE = 12;

/** Sort order: Ascending or Descending */
export type SortOrder = 'asc' | 'desc';

/** The application state type */
export interface State {
  /** Currently shown stocks */
  stocks: StockData[];
  /** Total number of stocks returned by the API*/
  totalRecords: number;
  /** Currently selected market. Defaults to Australia */
  country: string;
  /** The current offset of the stocks to load */
  offset: number;
  /** Order by Market cap (asc, desc) */
  orderBy: SortOrder;
  /** Stock fetching is in progress */
  isFetching: boolean;
  /** The current fetch error */
  error: Error | null;
}

/** The initial state of the application */
export const initialState: State = {
  stocks: [],
  totalRecords: 0,
  country: 'au',
  offset: 0,
  orderBy: 'desc',
  isFetching: true,
  error: null,
};
