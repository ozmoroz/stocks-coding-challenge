import { render, screen } from '@testing-library/react';
const { axe } = require('jest-axe');
import { Props, StockTile } from './StockTile';

const defaultProps: Props = {
  data: {
    canonical_url: '/stocks/ca/banks/tsx-ry/royal-bank-of-canada-shares',
    company_id: '1592FD9F-BF5B-469D-B8F3-D33379E0C0DE',
    id: 109809,
    info: {
      data: {
        description:
          'Royal Bank of Canada operates as a diversified financial service company worldwide',
      },
    },
    name: 'Royal Bank of Canada',
    score: {
      data: {
        future: 1,
        health: 6,
        income: 5,
        management: 0,
        misc: 0,
        past: 4,
        sentence: 'Flawless balance sheet established dividend payer.',
        total: 18,
        value: 2,
      },
    },
    unique_symbol: 'TSX:RY',
  },
};

describe('StockTile', () => {
  test('shows company name', () => {
    render(<StockTile {...defaultProps} />);
    expect(screen.getByText('Royal Bank of Canada')).toBeInTheDocument();
  });

  test('shows the unique symbol', () => {
    render(<StockTile {...defaultProps} />);
    expect(screen.getByText('TSX:RY')).toBeInTheDocument();
  });

  test('shows the snowflake code', () => {
    render(<StockTile {...defaultProps} />);
    expect(screen.getByText(/future: 1/)).toBeInTheDocument();
    expect(screen.getByText(/health: 6/)).toBeInTheDocument();
    expect(screen.getByText(/value: 2/)).toBeInTheDocument();
    expect(screen.getByText(/income: 5/)).toBeInTheDocument();
    expect(screen.getByText(/past: 4/)).toBeInTheDocument();
    expect(screen.getByText(/Total: 18/)).toBeInTheDocument();
    expect(
      screen.getByText(/Flawless balance sheet established dividend payer./)
    ).toBeInTheDocument();
  });

  test('has no accessibility issues', async () => {
    /* Check for basic accessibility issues
     * ref: https://github.com/nickcolley/jest-axe
     */
    const { container } = render(<StockTile {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
