import React, { useEffect, useState } from 'react';
import { Col, Card, Container } from 'react-bootstrap';
import Link from 'next/link';

interface Props {
  name?: string;
}

/** Info returned from Stocks API for a single stock. */
interface StockData {
  // Comments are sample data for Royal Bank of Canada
  canonical_url: string; // "/stocks/ca/banks/tsx-ry/royal-bank-of-canada-shares"
  company_id: string; // "1592FD9F-BF5B-469D-B8F3-D33379E0C0DE"
  exchange_symbol: string; // "TSX"
  id: number; // 109809;
  info: {
    data: {
      description: string; // "Royal Bank of Canada operates as a diversified financial service company worldwide"
      logo_url: string; // "/api/company/image/NYSE:RY/logo"
    };
  };
  name: string; // "Royal Bank of Canada"
  score: {
    data: {
      future: number; // 1
      health: number; // 6
      income: number; // 5
      management: number; // 0
      misc: number; // 0
      past: number; // 4
      sentence: string; // "Flawless balance sheet established dividend payer."
      total: number; // 18
      value: number; // 2
    };
  };
  slug: string; // "royal-bank-of-canada"
  ticker_symbol: string; // "RY"
  unique_symbol: string; // "TSX:RY"
}

/** Base URL of the site. We need this to suppolement relative URLs
because we are serving this page from a different domain. */
const BASE_URL = 'https://simplywall.st';

const App: React.FunctionComponent<Props> = ({ name }) => {
  /**  Stocks data */
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    fetch('https://api.simplywall.st/api/grid/filter?include=info,score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        no_result_if_limit: false,
        offset: 0,
        size: 12,
        state: 'read',
        rules: JSON.stringify([
          ['order_by', 'market_cap', 'desc'],
          ['grid_visible_flag', '=', true],
          ['market_cap', 'is_not_null'],
          ['primary_flag', '=', true],
          ['is_fund', '=', false],
          ['aor', [['country_name', 'in', ['ca']]]],
        ]),
      }),
    })
      .then((response) => response.json())
      .then((data) => setStocks(data.data as StockData[]))
      .catch((err) => console.log(err));
  });

  //   if (error) return <div>An error has occurred: ${error.message};</div>;
  return (
    <Container>
      <h1>The {name}</h1>
      {stocks.map((stock) => (
        <Card key={stock.id}>
          <Card.Body>
            <Card.Title>
              <Link href={`${BASE_URL}/${stock.canonical_url}`}>
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
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
  //   <div>
  //   <strong>👀 {data.subscribers_count}</strong>{' '}
  //        <strong>✨ {data.stargazers_count}</strong>{' '}
  //        <strong>🍴 {data.forks_count}</strong>);
  //        </div>
};

App.defaultProps = {
  name: 'Grid',
};
export default App;
