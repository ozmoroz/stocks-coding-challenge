import { STOCKS_PER_PAGE } from './state';
import { ActionType, reducer } from './reducer';
import { State } from './state';
import { STOCKS } from 'mocks/stocks.mock';
import { ApiResponse } from 'interfaces/ApiResponse';

describe('StocksGrid reducer', () => {
  it('LOAD_MORE action', () => {
    const action = { type: ActionType.LOAD_MORE };
    const state: State = {
      country: 'us',
      offset: 0,
      totalRecords: 0,
      orderBy: 'desc',
      isFetching: false,
      error: null,
      stocks: [],
    };
    const expectedState: State = {
      country: 'us',
      offset: STOCKS_PER_PAGE,
      totalRecords: 0,
      orderBy: 'desc',
      isFetching: false,
      error: null,
      stocks: [],
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('FETCH_STARTED action', () => {
    const action = { type: ActionType.FETCH_STARTED };
    const state: State = {
      country: 'us',
      offset: 12,
      totalRecords: 365,
      orderBy: 'desc',
      isFetching: false,
      error: null,
      stocks: [],
    };
    const expectedState: State = {
      country: 'us',
      offset: 12,
      totalRecords: 365,
      orderBy: 'desc',
      isFetching: true,
      error: null,
      stocks: [],
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('CHANGE_COUNTRY action', () => {
    const action = { type: ActionType.CHANGE_COUNTRY, payload: 'au' };
    const state: State = {
      country: 'us',
      offset: 12,
      totalRecords: 365,
      orderBy: 'desc',
      isFetching: false,
      error: null,
      stocks: STOCKS,
    };
    const expectedState: State = {
      country: 'au',
      offset: 0,
      totalRecords: 0,
      orderBy: 'desc',
      isFetching: false,
      error: null,
      stocks: [],
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('CHANGE_ORDER action', () => {
    const action = { type: ActionType.CHANGE_ORDER, payload: 'asc' };
    const state: State = {
      country: 'us',
      offset: 12,
      totalRecords: 365,
      orderBy: 'desc',
      isFetching: false,
      error: null,
      stocks: STOCKS,
    };
    const expectedState: State = {
      country: 'us',
      offset: 0,
      totalRecords: 0,
      orderBy: 'asc',
      isFetching: false,
      error: null,
      stocks: [],
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('FETCH_COMPLETED action', () => {
    const payload = {
      stocks: STOCKS,
      totalRecords: 192,
    };
    const action = { type: ActionType.FETCH_COMPLETED, payload };

    const state: State = {
      country: 'us',
      offset: 0,
      totalRecords: 0,
      orderBy: 'desc',
      isFetching: true,
      error: null,
      stocks: [],
    };
    const expectedState: State = {
      country: 'us',
      offset: 0,
      totalRecords: 192,
      orderBy: 'desc',
      isFetching: false,
      error: null,
      stocks: STOCKS,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('FETCH_FAILED action', () => {
    const error: Error = new Error('Failed to fetch stocks');
    const action = {
      type: ActionType.FETCH_FAILED,
      payload: error,
    };

    const state: State = {
      country: 'us',
      offset: 0,
      totalRecords: 0,
      orderBy: 'desc',
      isFetching: true,
      error: null,
      stocks: [],
    };
    const expectedState: State = {
      country: 'us',
      offset: 0,
      totalRecords: 0,
      orderBy: 'desc',
      isFetching: false,
      error,
      stocks: [],
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });
});
