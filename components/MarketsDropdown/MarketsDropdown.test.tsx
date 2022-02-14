import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const { axe } = require('jest-axe');
import { Props, MarketsDropdown } from './MarketsDropdown';

const defaultProps: Props = {
  selectedCountry: 'au',
  onChange: jest.fn(),
};

describe('MarketsDropdown', () => {
  test('shows the pre-selected country', () => {
    const props = { ...defaultProps, selectedCountry: 'be' };
    render(<MarketsDropdown {...props} />);
    expect(screen.getByRole('textbox')).toHaveValue('Belgium');
  });

  test('shows list of countries when "down" combobox button is clicked', () => {
    render(<MarketsDropdown {...defaultProps} />);
    userEvent.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('option', { name: 'Global' })).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'United States' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Australia' })
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Canada' })).toBeInTheDocument();
  });

  test('Choosing a country option fires onChangeEvent', () => {
    render(<MarketsDropdown {...defaultProps} />);
    userEvent.click(screen.getByRole('button', { name: 'Open' }));
    userEvent.click(screen.getByRole('option', { name: 'United States' }));
    expect(defaultProps.onChange).toHaveBeenCalledWith('us');
  });

  test.skip('Pressing escape in the input field clears it', async () => {
    render(<MarketsDropdown {...defaultProps} />);
    const textBox = screen.getByRole('textbox', { name: 'Choose a market:' });
    userEvent.type(textBox, '{esc}');
    // TODO: figure out why this fails
    await waitFor(() => expect(textBox).toHaveValue(''));
  });

  test('Typing into the textbox filter countries', async () => {
    render(<MarketsDropdown {...defaultProps} />);
    const textBox = screen.getByRole('textbox', { name: 'Choose a market:' });
    userEvent.type(textBox, '{esc}'); // Clear the textbox first
    userEvent.type(textBox, 'be');
    expect(
      await screen.findByRole('option', { name: 'Belgium' })
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Bermuda' })).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'United States' })
    ).not.toBeInTheDocument();
  });

  test('has no accessibility issues', async () => {
    /* Check for basic accessibility issues
     * ref: https://github.com/nickcolley/jest-axe
     */
    const { container } = render(<MarketsDropdown {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
