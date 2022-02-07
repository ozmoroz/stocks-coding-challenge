// import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { useCombobox } from 'downshift';
import styled from 'styled-components';
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
        if (onChange) onChange(selectedItem.option);
      },
    });
    return (
      <Dropdown>
        <label {...getLabelProps()}>Choose a market:</label>
        <div
          //   className=".downshift-dropdown"
          // style={comboboxStyles}
          {...getComboboxProps()}>
          <input {...getInputProps()} />
          <button
            className="dropdown-button"
            type="button"
            {...getToggleButtonProps()}
            aria-label="toggle menu">
            &#8595;
          </button>

          <DropdownContent {...getMenuProps()} /*style={menuStyles}*/>
            {isOpen &&
              inputItems.map((item, index) => (
                <DropdownItem
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: '#bde4ff' }
                      : {}
                  }
                  key={item.option}
                  {...getItemProps({ item, index })}>
                  {item.label}
                </DropdownItem>
              ))}
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
};
