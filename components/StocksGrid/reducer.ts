import { StockData } from 'interfaces/StockData';
import { STOCKS_PER_PAGE, State } from './state';

/** All possible action types */
export enum ActionType {
  /** "Load Mode" button clicked */
  LOAD_MORE = 'LOAD_MORE',
  /** Started fetching stocks from the API */
  FETCH_STARTED = 'FETCH_STARTED',
  /** Fetching stocks from the API completed */
  FETCH_COMPLETED = 'FETCH_COMPLETED',
  /** Error during fetching stocks from the API */
  FETCH_FAILED = 'FETCH_FAILED',
  /** A new market selected from Countries drop-down */
  CHANGE_COUNTRY = 'CHANGE_COUNTRY',
  /** Use changed the market cap order (Ascending / descending) */
  CHANGE_ORDER = 'CHANGE_ORDER',
}

/** A base class for all action types */
interface BaseAction<T> {
  type: ActionType;
  payload?: T;
}

/** Payload type of FETCH_COMPLETED action */
interface FetchCompletedPayload {
  /** Loaded stocks */
  stocks: StockData[];
  /** Total number of stocks */
  totalRecords: number;
}

/** An action type to load more stocks. Does not contain a payload */
type LoadMoreAction = BaseAction<void>;
/** An action to change the market (country). Contains a country code as a payload  */
type ChangeCountryAction = BaseAction<string>;
/** An action to change the sort order. Payload is asc(ending) or desc(ending) */
type ChangeOrderAction = BaseAction<'asc' | 'desc'>;
/** An action to that fires when stock fetching from the API is started */
type FetchStartedAction = BaseAction<void>;
/** An action to that fires when stock fetching from the API resulted in an error */
type FetchFailedAction = BaseAction<Error>;
/** An action to that fires when stock fetching from the API is completed */
type FetchCompletedAction = BaseAction<FetchCompletedPayload>;

/** Common type for all of our actions */
type Action =
  | LoadMoreAction
  | ChangeCountryAction
  | FetchStartedAction
  | FetchFailedAction
  | FetchCompletedAction
  | ChangeOrderAction;

/* This is the rocket science part.
 * Becase nearly all of our action type contain `payload` field, but it may be of a different type,
 * Typescript needs a way to tell one type from another.
 * Therefore, we create type predicates to help it figure out types.
 * Ref: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */

/** A type predicate to tell if `action` is a `LoadMoreAction` */
function isLoadMoreAction(action: Action): action is LoadMoreAction {
  return action.type === ActionType.LOAD_MORE;
}

/** A type predicate to tell if `action` is a `ChangeCountryAction` */
function isChangeCountryAction(action: Action): action is ChangeCountryAction {
  return action.type === ActionType.CHANGE_COUNTRY;
}

/** A type predicate to tell if `action` is a `FetchStartedAction` */
function isFetchStartedAction(action: Action): action is FetchCompletedAction {
  return action.type === ActionType.FETCH_STARTED;
}

/** A type predicate to tell if `action` is a `FetchCompletedAction` */
function isFetchCompletedAction(
  action: Action
): action is FetchCompletedAction {
  return action.type === ActionType.FETCH_COMPLETED;
}

/** A type predicate to tell if `action` is a `FetchFailedAction` */
function isFetchFailedAction(action: Action): action is FetchCompletedAction {
  return action.type === ActionType.FETCH_FAILED;
}

/** A type predicate to tell if `action` is a `ChangeOrderAction` */
function isChangeOrderAction(action: Action): action is ChangeOrderAction {
  return action.type === ActionType.CHANGE_ORDER;
}

/** A reducer to use with useReducer hook.
 * Ref: https://reactjs.org/docs/hooks-reference.html#usereducer
 */
export function reducer(state: State, action: Action): State {
  /* Handle LOAD_MORE action to load more stocks from the API */
  if (isLoadMoreAction(action)) {
    return { ...state, offset: state.offset + STOCKS_PER_PAGE };
    /* handle CHANGE_COUNTRY action to change the current market */
  } else if (isChangeCountryAction(action)) {
    return {
      ...state,
      country: action.payload,
      offset: 0,
      totalRecords: 0,
      stocks: [],
    };
    /** Handle CHANGE_ORDER action to change the stocks ordering by market cap (Ascending/Descending) */
  } else if (isChangeOrderAction(action)) {
    return {
      ...state,
      offset: 0,
      stocks: [],
      totalRecords: 0,
      orderBy: action.payload,
    };
    /** Handle FETCH_STARTED action to set loading flag to true */
  } else if (isFetchStartedAction(action)) {
    return {
      ...state,
      error: null,
      isFetching: true,
    };
    /** Handle FETCH_COMPLETED action to update the list of displayed stocks */
  } else if (isFetchCompletedAction(action)) {
    return {
      ...state,
      isFetching: false,
      error: null,
      stocks:
        /* If offset is 0, that means we are doing an initial load,
         * or changing a country or an ordering.
         * In that case, return only the loaded stocks.
         * Otherwise, append the loaded stocks to the existing ones
         */
        state.offset === 0
          ? action.payload.stocks
          : [...state.stocks, ...action.payload.stocks],
      totalRecords: action.payload.totalRecords,
    };
    /** Handle FETCH_FAILED action to reset "loading" flag and show the error message */
  } else if (isFetchFailedAction(action)) {
    return {
      ...state,
      isFetching: false,
      error: action.payload,
      stocks: [],
      totalRecords: 0,
    };
  } else {
    // We should use some kind of structured server logging here instead of console logging.
    console.error('Unknown action: ' + action);
  }
}
