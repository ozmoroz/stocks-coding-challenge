import { Autocomplete, TextField } from '@mui/material';
import MARKETS from '../../markets.json';

export interface Props {
  selectedCountry?: string;
  onChange?: (country: string) => void;
}

/** Market options, extracted from https://simplywall.st/stocks */
export interface Market {
  option: string; // "au",
  label: string; //"Australia",
  href: string; //"/stocks/au/market-cap-large"
}

/** Get the slected market by the country name */
const getSelectedmarket = (
  selectedCountry: string | undefined
): Market | undefined => {
  if (!selectedCountry) return undefined;
  return (MARKETS as Market[]).find((item) => item.option === selectedCountry);
};

export const MarketsDropdown: React.FunctionComponent<Props> = ({
  selectedCountry,
  onChange,
}) => {
  const selectedMarket = getSelectedmarket(selectedCountry);
  return (
    <Autocomplete
      clearOnEscape
      disablePortal
      options={MARKETS}
      renderInput={(params) => (
        <TextField {...params} label="Choose a market:" />
      )}
      sx={{ display: 'flex', flex: '1 1 auto' }}
      value={selectedMarket}
      onChange={(_, value) => {
        if (onChange && value?.option) onChange(value.option);
      }}
    />
  );
};
