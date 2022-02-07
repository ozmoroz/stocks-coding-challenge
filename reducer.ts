
import { StockData } from "interfaces/StockData";

/// Number to stocks show per page
export const STOCKS_PER_PAGE = 12;

/** All possible action types */
export enum ActionType {
    /** "Load Mode" button clicked */
    LOAD_MORE = 'LOAD_MORE',
    /** Fetching stocks fromt the API completed */
    FETCH_COMPLETED = 'FETCH_COMPLETED',
    /** A new market selected from Countries drop-down */
    CHANGE_COUNTRY = 'CHANGE_COUNTRY',
    /** Use changed the market cap order (Ascending / descending) */
    CHANGE_ORDER = 'CHANGE_ORDER'
}

/** A base class for all action types */
interface BaseAction<T> {
    type: ActionType;
    payload?: T;
  }
  
  /** An action type to load more stocks. Does not contain a payload */
  type LoadMoreAction = BaseAction<void>;
  /** An action to change the market (country). Contains a country code as a payload  */
  type ChangeCountryAction = BaseAction<string>;
  /** An action to change the sort order. Payload is asc(ending) or desc(ending) */
  type ChangeOrderAction = BaseAction<'asc' | 'desc'>;
  /** An action to that fires when stock fetching from the API is completed */
  type FetchCompletedAction = BaseAction<StockData[]>;
  
  /** Common type for all of our actions */
  type Action =
    | LoadMoreAction
    | ChangeCountryAction
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
  function isChangeCountryAction(
    action: Action
  ): action is ChangeCountryAction {
    return action.type === ActionType.CHANGE_COUNTRY;
  }
  
  /** A type predicate to tell if `action` is a `FetchCompletedAction` */
  function isFetchCompletedAction(
    action: Action
  ): action is FetchCompletedAction {
    return action.type === ActionType.FETCH_COMPLETED;
  }
  
   /** A type predicate to tell if `action` is a `ChangeOrderAction` */
  function isChangeOrderAction(action: Action): action is ChangeOrderAction {
    return action.type === ActionType.CHANGE_ORDER;
  }

  /** The application state type */
  interface State {
    /** Currently shown stocks */
    stocks: StockData[];
    /** Currently selected market. Defaults to Australia */
    country: string;
    /** The current offset of the stocks to load */
    offset: number;
    /** Order by Market cap (asc, desc) */
    orderBy: 'asc' | 'desc';
  }

  /** The initial state of the application */
  export const initialState: State = {
    stocks: [],
    country: 'au',
    offset: 0,
    orderBy: 'desc',
  };

  /** A reducer to use with useReducer hook.
   * Ref: https://reactjs.org/docs/hooks-reference.html#usereducer
   */
  export function reducer(
    state: State,
    action: Action
  ): State {
    /* Handle LOAD_MORE action to load more stocks from the API */
    if (isLoadMoreAction(action)) {
      return { ...state, offset: state.offset + STOCKS_PER_PAGE };
    /* handle CHANGE_COUNTRY action to change the current market */
    } else if (isChangeCountryAction(action)) {
      return {
        ...state,
        country: action.payload,
        offset: 0,
        stocks: [],
      };
    /** Handle CHANGE_ORDER action to change the stocks ordering by market cap (Ascending/Descending) */
    } else if (isChangeOrderAction(action)) {
      return {
        ...state,
        offset: 0,
        orderBy: action.payload,
      };
    /** Handle FETCH_COMPLETED action to update the list of displayed stocks */
    } else if (isFetchCompletedAction(action)) {
      return {
        ...state,
        stocks:
          /* If offset is 0, that means we are doing an initial load,
           * or changing a country or an ordering.
           * In that case, return only the loaded stocks.
           * Otherwise, append the loaded stocks to the existing ones
           */
          state.offset === 0
            ? action.payload
            : [...state.stocks, ...action.payload],
      };
    } else {
      // We should use some kind of structured server logging here instead of console logging.
      console.error('Unknown action: ' + action);
    }
  }