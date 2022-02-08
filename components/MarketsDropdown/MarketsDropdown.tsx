import { useState } from 'react';
import { useCombobox } from 'downshift';
import { Button, Form, InputGroup } from 'react-bootstrap';
import MARKETS from '../../markets.json';
import { Dropdown, DropdownContent, DropdownItem } from './styles';

interface Props {
  selectedCountry?: string;
  onChange?: (country: string) => void;
}

/** Market options, extracted from https://simplywall.st/stocks */
export interface Market {
  option: string; // "au",
  label: string; //"Australia",
  href: string; //"/stocks/au/market-cap-large"
}

export const MarketsDropdown: React.FunctionComponent<Props> = ({
  selectedCountry,
  onChange,
}) => {
  {
    const [inputItems, setInputItems] = useState<Market[]>(MARKETS);

    // Pre-select the country passed in props
    const initialSelecteditem = inputItems.find(
      (market) => market.option === selectedCountry
    );

    const itemToString = (item: Market): string => item.label;
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items: inputItems,
      itemToString,
      initialSelectedItem: initialSelecteditem,
      initialInputValue: initialSelecteditem?.label,
      // Pre-select the country passed in props
      onInputValueChange: ({ inputValue }) => {
        setInputItems(
          (MARKETS as Market[]).filter((item) =>
            item.label.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      },
      onSelectedItemChange: ({ selectedItem }) => {
        if (onChange && selectedItem) onChange(selectedItem.option);
      },
    });
    return (
      <Dropdown>
        <Form.Group className="mb-3">
          <div {...getComboboxProps()}>
            <Form.Label htmlFor="country-dropdown" {...getLabelProps()}>
              Choose a market:
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="country-dropdown"
                type="text"
                {...getInputProps()}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                {...getToggleButtonProps()}
                aria-label="toggle menu">
                &#8595;
              </Button>
            </InputGroup>

            <DropdownContent {...getMenuProps()}>
              {isOpen &&
                inputItems.map((item, index) => (
                  <DropdownItem
                    isHighlighted={highlightedIndex === index}
                    key={item.option}
                    {...getItemProps({ item, index })}>
                    {item.label}
                  </DropdownItem>
                ))}
            </DropdownContent>
          </div>
        </Form.Group>
      </Dropdown>
    );
  }
};
