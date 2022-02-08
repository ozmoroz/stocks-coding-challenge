import {StockData} from './StockData';

/** Data returned by https://api.simplywall.st/api/grid/filter API. */
export interface ApiResponse {
    data: StockData[];
    meta: {
        total_records: number;
    }
}