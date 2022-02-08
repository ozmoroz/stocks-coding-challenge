import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { StockData } from 'interfaces/StockData';
import { BASE_URL } from 'state';

interface Props {
  /** Stock information to show in a tile */
  data: StockData;
}

export const StockTile: React.FunctionComponent<Props> = ({
  data: {
    id,
    canonical_url,
    unique_symbol,
    name,
    info: {
      data: { description },
    },
    score: {
      data: { value, future, past, health, income, total, sentence },
    },
  },
}) => {
  return (
    <Card key={id}>
      <Card.Body>
        <Card.Title>
          <Link href={`${BASE_URL}${canonical_url}`}>{unique_symbol}</Link>
        </Card.Title>
        <Card.Subtitle>{name}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          Score:
          <ul>
            <li>value: {value} </li>
            <li>future: {future}</li>
            <li>past: {past}</li>
            <li>health: {health}</li>
            <li>income: {income}</li>
            <li>total: {total}</li>
          </ul>
          <p>{sentence}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// export const StockTile: React.FunctionComponent<Props> = ({id, canonical_url,unique_symbol name, info: {data: {description}} }) => {
