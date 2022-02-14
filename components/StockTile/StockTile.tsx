import { Card, CardContent, Typography } from '@mui/material';
import { StockData } from 'interfaces/StockData';
import { BASE_URL } from 'interfaces/constants';

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
    <Card key={id} variant="outlined">
      <CardContent>
        <Typography sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize', mb: 1 }}>
          <a href={`${BASE_URL}${canonical_url}`}>{unique_symbol}</a>
        </Typography>
        <Typography sx={{ fontWeight: 'bold', mb: 0.5 }}>{name}</Typography>
        <Typography>{description}</Typography>
        <div>
          Score:
          <ul>
            <li>value: {value} </li>
            <li>future: {future}</li>
            <li>past: {past}</li>
            <li>health: {health}</li>
            <li>income: {income}</li>
          </ul>
          <Typography>Total: {total}</Typography>
          <Typography sx={{ mt: 0.5 }}>{sentence}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
