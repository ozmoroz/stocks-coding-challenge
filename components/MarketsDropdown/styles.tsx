import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const DropdownButton = styled(Button)`
  border-color: rgb(206, 212, 218);
`;

export const DropdownContent = styled.ul`
  list-style: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
  padding: 0;
`;

interface IDropdownItem {
  /** Is the current element highlighted? */
  isHighlighted?: boolean;
}

/** Highlight the currently selected list item */
export const DropdownItem = styled.li<IDropdownItem>`
  padding: 0 0.5rem;
  background-color: ${(props) => (props.isHighlighted ? '#bde4ff' : '#fff')};
`;
