import React, { useEffect, useReducer } from 'react';
import {
  Button,
  Card,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import Link from 'next/link';
import { StockData } from 'interfaces/StockData';
import { ActionType, reducer, initialState, STOCKS_PER_PAGE } from 'reducer';
import { MarketsDropdown } from 'components/MarketsDropdown';
import { StateChangeFunction } from 'downshift';

/** Base URL of the site. We need this to suppolement relative URLs
because we are serving this page from a different domain. */
const BASE_URL = 'https://simplywall.st';

const App: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /** Fetch the list of stocks from the API.
   * Re-runs when either a stock offset, selected country or stock ordering change.
   */
  useEffect(
    () => {
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
        // TODO: Show error message
        .catch((err) => console.log(err));
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
      {state.stocks.map((stock) => (
        <Card key={stock.id}>
          <Card.Body>
            <Card.Title>
              <Link href={`${BASE_URL}${stock.canonical_url}`}>
                {stock.unique_symbol}
              </Link>
            </Card.Title>
            <Card.Subtitle>{stock.name}</Card.Subtitle>
            <Card.Text>{stock.info.data.description}</Card.Text>
            <Card.Text>
              Score:
              <ul>
                <li>value: {stock.score.data.value} </li>
                <li>future: {stock.score.data.future}</li>
                <li>past: {stock.score.data.past}</li>
                <li>health: {stock.score.data.health}</li>
                <li>income: {stock.score.data.income}</li>
                <li>total: {stock.score.data.total}</li>
              </ul>
              <p>{stock.score.data.sentence}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Button variant="primary" onClick={handleLoadMore}>
        Load more...
      </Button>
    </Container>
  );
};

export default App;
