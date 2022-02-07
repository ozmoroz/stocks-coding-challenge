import styled from 'styled-components';

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownContent = styled.ul`
  list-style: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropdownItem = styled.li`
  // color: black;
  padding: 12px 16px;
  // text-decoration: none;
  // display: block;
`;
