import React, { useEffect, useReducer } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { ApiResponse } from 'interfaces/ApiResponse';
import { StockData } from 'interfaces/StockData';
import { initialState, STOCKS_PER_PAGE } from './state';
import { ActionType, reducer } from './reducer';
import { MarketsDropdown } from 'components/MarketsDropdown';
import { StockTile } from 'components/StockTile';
import { SkeletonTile } from 'components/SkeletonTile';

export const StocksGrid: React.FunctionComponent = () => {
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
            payload: {
              stocks: (data as ApiResponse).data as StockData[],
              totalRecords: (data as ApiResponse).meta.total_records,
            },
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

  /** Render an error message, stock tiles, loading skeleton tiles, or no stocks found messge. */
  const renderStockList = () => {
    if (state.error) {
      /* Fetch error happened - show error message.
        We show a generic error message to the user rather than the actual error message
        we received from the API. That is because the actual error may contain sensitive information.
        Besides, most likely it has no value to the user.
        We show a generic error message but log the real one.
      */
      return <Alert severity="error">An error has occurred.</Alert>;
      // No stocks were found for this country - show an info message
    } else if (!state.isFetching && state.stocks.length === 0) {
      return (
        <Alert severity="info">No stocks found for the selected market.</Alert>
      );
      // Show the list of stocks
    } else {
      return (
        <Stack spacing={1}>
          {state.stocks.map((stock) => (
            <StockTile key={stock.company_id} data={stock} />
          ))}
          {/* If data fetching is in progress, show skeleton animations for the tiles being loaded */}
          {state.isFetching &&
            new Array(STOCKS_PER_PAGE)
              .fill(0)
              .map((_, i) => <SkeletonTile key={`skeleton-${i}`} />)}
        </Stack>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mx: -0.5,
          py: 1,
        }}>
        <Box sx={{ display: 'flex', flex: '1 0 300px', m: 0.5 }}>
          <MarketsDropdown
            selectedCountry={state.country}
            onChange={(country) => {
              if (country)
                dispatch({
                  type: ActionType.CHANGE_COUNTRY,
                  payload: country,
                });
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flex: '1 0 300px', m: 0.5 }}>
          <Box sx={{ display: 'flex' }}>
            <FormControl>
              <FormLabel id="sort-by-toggle">Sort by market cap:</FormLabel>
              <RadioGroup
                row
                name="sort-order"
                aria-labelledby="sort-by-toggle"
                value={[state.orderBy]}
                onChange={(ev, value) => {
                  handleOrderChanged(value as 'asc' | 'desc');
                }}>
                <FormControlLabel
                  value="desc"
                  control={<Radio />}
                  label="Descending"
                />
                <FormControlLabel
                  value="asc"
                  control={<Radio />}
                  label="Ascending"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
      {renderStockList()}
      {/* Show Load more button if there are more stocks to load */}
      {state.stocks.length < state.totalRecords && (
        <Box sx={{ display: 'flex', my: 2 }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load more...
          </Button>
        </Box>
      )}
    </Box>
  );
};
