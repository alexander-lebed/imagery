import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const mockOnChange = jest.fn();
const mockOnClear = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Input', () => {
  it('handles value and onChange correctly', async () => {
    render(<Input aria-label="Search input" value="Test" onChange={mockOnChange} />);

    screen.getByLabelText('Search input'); // accessibility

    await userEvent.type(screen.getByRole('textbox'), ' input');
    expect(mockOnChange).toHaveBeenCalled();
  });

  describe('clearable functionality', () => {
    it('does not show clear button when clearable is false', () => {
      render(<Input value="test" clearable={false} onClear={mockOnClear} />);

      const clearButton = screen.queryByLabelText('Clear input');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('does not show clear button when value is empty', () => {
      render(<Input value="" clearable onClear={mockOnClear} />);

      const clearButton = screen.queryByLabelText('Clear input');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('does not show clear button when onClear is not provided', () => {
      render(<Input value="test" clearable={true} />);

      const clearButton = screen.queryByLabelText('Clear input');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('shows Clear button and handles onClear', async () => {
      //   const user = userEvent.setup();
      render(<Input value="test" clearable={true} onClear={mockOnClear} />);

      const clearButton = screen.getByLabelText('Clear input');
      await userEvent.click(clearButton);
      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    it('clear button is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Input value="test" clearable={true} onClear={mockOnClear} />);

      const clearButton = screen.getByLabelText('Clear input');
      expect(clearButton).toHaveAttribute('tabIndex', '0');

      clearButton.focus();
      await user.keyboard('{Enter}');

      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });
  });
});
