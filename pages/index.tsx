import Container from '@mui/material/Container';
import { StocksGrid } from 'components/StocksGrid';

const IndexPage: React.FunctionComponent = () => (
  <Container maxWidth="lg">
    <StocksGrid />
  </Container>
);

export default IndexPage;
