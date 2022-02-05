import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

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
      logo_url: string; // "/api/company/image/NYSE:RY/logo"
      main_header: string; // "https://images.simplywall.st/asset/company-cover/109809-main-header/1585186941972"
      main_thumb: string; // "https://images.simplywall.st/asset/company-cover/109809-main-thumb/1585186601074"
      url: string; // "www.rbc.com"
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
      }), // body data type must match "Content-Type" header
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
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
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
