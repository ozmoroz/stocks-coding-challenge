import { Card, Stack } from 'react-bootstrap';
import { StockData } from 'interfaces/StockData';
import { BASE_URL } from 'state';

export interface Props {
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
          <a href={`${BASE_URL}${canonical_url}`}>{unique_symbol}</a>
        </Card.Title>
        <Card.Subtitle>{name}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <div>
          Score:
          <ul>
            <li>value: {value} </li>
            <li>future: {future}</li>
            <li>past: {past}</li>
            <li>health: {health}</li>
            <li>income: {income}</li>
          </ul>
          <Card.Text>Total: {total}</Card.Text>
          <Card.Text>{sentence}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

// export const StockTile: React.FunctionComponent<Props> = ({id, canonical_url,unique_symbol name, info: {data: {description}} }) => {
