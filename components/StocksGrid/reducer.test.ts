import { STOCKS_PER_PAGE } from './state';
import {
  ChangeCountryAction,
  ChangeOrderAction,
  FetchCompletedAction,
  FetchFailedAction,
  FetchStartedAction,
  LoadMoreAction,
  reducer,
} from './reducer';
import { State } from './state';
import { STOCKS } from 'mocks/stocks.mock';

describe('StocksGrid reducer', () => {
  it('LOAD_MORE action', () => {
    const action = new LoadMoreAction();
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
    const action = new FetchStartedAction();
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
    const action = new ChangeCountryAction('au');
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
    const action = new ChangeOrderAction('asc');
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
    const action = new FetchCompletedAction(payload);

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
    const action = new FetchFailedAction(error);

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
