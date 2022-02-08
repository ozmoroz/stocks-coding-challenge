import React, { useEffect, useReducer } from 'react';
import {
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { StockData } from 'interfaces/StockData';
import { ActionType, reducer, initialState, STOCKS_PER_PAGE } from 'state';
import { MarketsDropdown } from 'components/MarketsDropdown';
import { StockTile } from 'components/StockTile';

const App: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /** Fetch the list of stocks from the API.
   * Re-runs when either a stock offset, selected country or stock ordering change.
   */
  useEffect(
    () => {
      dispatch({ type: ActionType.FETCH_STARTED });
      fetch('https://api.simplywall.st/api/grid/filter?include=info,score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          no_result_if_limit: false,
          offset: state.offset,
          size: STOCKS_PER_PAGE,
          state: 'read',
          rules: JSON.stringify([
            ['order_by', 'market_cap', state.orderBy],
            ['grid_visible_flag', '=', true],
            ['market_cap', 'is_not_null'],
            ['primary_flag', '=', true],
            ['is_fund', '=', false],
            ['aor', [['country_name', 'in', [state.country]]]],
          ]),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: ActionType.FETCH_COMPLETED,
            payload: data.data as StockData[],
          });
        })
        .catch((err) => {
          dispatch({ type: ActionType.FETCH_FAILED, payload: err });
          // Ideally we should log the error to some kind of structured server-side logging engine
          // rather than logging the error to the console
          console.log(err);
        });
    },
    /** Re-load the data if the current country or stock ordering changed.
     * Load more stocks if the offset changed
     */
    [state.offset, state.country, state.orderBy]
  );

  /** Hanle "Load More" button click */
  const handleLoadMore = () => {
    dispatch({ type: ActionType.LOAD_MORE });
  };

  /** Hanlde selecting the market cap stock sort order */
  const handleOrderChanged = (order: typeof state.orderBy) => {
    dispatch({
      type: ActionType.CHANGE_ORDER,
      payload: order,
    });
  };

  //   TODO: if (error) return <div>An error has occurred: ${error.message};</div>;
  return (
    <Container>
      <MarketsDropdown
        selectedCountry={state.country}
        onChange={(country) =>
          dispatch({ type: ActionType.CHANGE_COUNTRY, payload: country })
        }
      />
      <ToggleButtonGroup
        type="checkbox"
        value={[state.orderBy]}
        onChange={(ev) => {
          handleOrderChanged(ev[1] as 'asc' | 'desc');
        }}>
        <ToggleButton id="tbg-btn-1" value="asc">
          Ascending
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value="desc">
          Descending
        </ToggleButton>
      </ToggleButtonGroup>
      {/* Fetch error happened - show error message.
          We show a generic error message to the user rather than the actual error message
          we received from the API. That is because the actual error may contain sensitive information.
          Besides, most likely it has no value to the user.
          We show a generic error message but log the real one.
          */}
      {state.error && <div>An error has occurred: </div>}
      {state.stocks.map((stock) => (
        <StockTile data={stock} />
      ))}
      {/* If data fetching is in progress, show skeleton animations for the tiles being loaded */}
      {state.isFetching &&
        new Array(STOCKS_PER_PAGE).fill(0).map((_, i) => <div>Loading...</div>)}
      <Button variant="primary" onClick={handleLoadMore}>
        Load more...
      </Button>
    </Container>
  );
};

export default App;
