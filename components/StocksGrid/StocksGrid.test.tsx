import { enableFetchMocks } from 'jest-fetch-mock';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const { axe } = require('jest-axe');
import { ApiResponse } from 'interfaces/ApiResponse';
import { STOCKS_PER_PAGE } from './state';
import { STOCKS } from 'mocks/stocks.mock';
import { StocksGrid } from './StocksGrid';

enableFetchMocks();

/** Type of rules field returned by the API
 * We don't control the API, therefore we don't know the exact type it returns.
 * We resort to `unknown` type for the lack of a better option. */
type Rules = unknown[][];

/** Return "rules" part of the API request body */
function getRulesFromResponse(body: BodyInit | null | undefined): Rules {
  if (!body) {
    return [];
  }
  const requestBody = JSON.parse(body.toString());
  return JSON.parse(requestBody.rules);
}

describe('StocksGrid', () => {
  describe('Normal path', () => {
    /* Mock fetch response.
     * ref: https://github.com/jefflau/jest-fetch-mock
     */
    beforeEach(() => {
      fetchMock.resetMocks();
      const apiResponse: ApiResponse = {
        data: STOCKS,
        meta: {
          total_records: 192,
        },
      };
      fetchMock.mockResponse(JSON.stringify(apiResponse));
    });

    test('renders skeleton tiles while the stocks are loading', async () => {
      render(<StocksGrid />);
      expect(screen.getAllByText(/Loading.../).length).toBe(STOCKS_PER_PAGE);
    });

    test('renders the list of stocks', async () => {
      render(<StocksGrid />);
      expect(await screen.findByText('TSX:RY')).toBeInTheDocument();
      expect(await screen.findByText('NasdaqGS:NVDA')).toBeInTheDocument();
      expect(await screen.findByText('NYSE:JPM')).toBeInTheDocument();
    });

    test('changing country fires fetch request for the new country', () => {
      render(<StocksGrid />);
      userEvent.click(screen.getByRole('button', { name: 'Open' }));
      userEvent.click(screen.getByRole('option', { name: 'United States' }));
      expect(fetchMock.mock.calls.length).toEqual(2);
      const rules = getRulesFromResponse(fetchMock.mock.calls[1][1]?.body);
      expect(rules).toEqual([
        ['order_by', 'market_cap', 'desc'],
        ['grid_visible_flag', '=', true],
        ['market_cap', 'is_not_null'],
        ['primary_flag', '=', true],
        ['is_fund', '=', false],
        ['aor', [['country_name', 'in', ['us']]]],
      ]);
    });

    test('changing order by direction fires fetch request for the new order by', () => {
      render(<StocksGrid />);
      userEvent.click(screen.getByRole('radio', { name: 'Ascending' }));
      expect(fetchMock.mock.calls.length).toEqual(2);
      const rules = getRulesFromResponse(fetchMock.mock.calls[1][1]?.body);
      expect(rules[0][2]).toEqual('asc');
    });

    test('clicking on "Load more" fires fetch request to fetch more stocks', async () => {
      render(<StocksGrid />);
      userEvent.click(
        await screen.findByRole('button', { name: 'Load more...' })
      );
      expect(fetchMock.mock.calls.length).toEqual(2);
      const body = fetchMock.mock.calls[1][1]?.body;
      expect(body).toBeDefined();
      expect(body).not.toBeNull();
      expect(JSON.parse(body!.toString()).offset).toEqual(STOCKS_PER_PAGE);
    });
  });

  describe('All stocks fit on the screen', () => {
    /* Mock fetch response.
     * ref: https://github.com/jefflau/jest-fetch-mock
     */
    beforeEach(() => {
      fetchMock.resetMocks();
      const apiResponse: ApiResponse = {
        data: STOCKS,
        meta: {
          total_records: 4,
        },
      };
      fetchMock.mockResponse(JSON.stringify(apiResponse));
    });

    test('does not show "Load more" button', async () => {
      render(<StocksGrid />);
      // Wait for the screen to render
      expect(await screen.findByText('NYSE:JPM')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Load more...' })
      ).not.toBeInTheDocument();
    });
  });

  describe('No stocks found for this country', () => {
    /* Mock fetch response.
     * ref: https://github.com/jefflau/jest-fetch-mock
     */
    beforeEach(() => {
      fetchMock.resetMocks();
      const apiResponse: ApiResponse = {
        data: [],
        meta: {
          total_records: 0,
        },
      };
      fetchMock.mockResponse(JSON.stringify(apiResponse));
    });

    test('shows "No stocks for this country" alert and no stocks', async () => {
      render(<StocksGrid />);
      // Wait for the screen to render
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /No stocks found for the selected market./
      );
      expect(screen.queryByText('NYSE:JPM')).not.toBeInTheDocument();
    });
  });

  describe('API returns an error', () => {
    /* Mock fetch response.
     * ref: https://github.com/jefflau/jest-fetch-mock
     */
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockReject(new Error('Fetch failed error message'));
    });

    test('shows "Fetch failed" alert and no stocks', async () => {
      render(<StocksGrid />);
      // Wait for the screen to render
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /An error has occurred./
      );
      expect(screen.queryByText('NYSE:JPM')).not.toBeInTheDocument();
    });
  });

  test('has no accessibility issues', async () => {
    /* Check for basic accessibility issues
     * ref: https://github.com/nickcolley/jest-axe
     */
    const { container } = render(<StocksGrid />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
