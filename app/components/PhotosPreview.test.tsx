import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { photos } from '@/app/mockedData';
import PhotosPreview from '../components/PhotosPreview';

// Mock the useQuery hook
const mockUseQuery = useQuery as jest.Mock;
const mockOnClick = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('PhotosPreview', () => {
  it('renders loading state correctly', async () => {
    // Mock the loading state
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<PhotosPreview topic="nature" onClick={mockOnClick} />);

    // Check if loading UI is displayed
    expect(screen.getByText('nature')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('photos-preview-loading'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders no results state correctly', async () => {
    // Mock the no results state
    mockUseQuery.mockReturnValue({
      data: { results: [] },
      isLoading: false,
    });

    render(<PhotosPreview topic="nonexistent" onClick={mockOnClick} />);

    // Check if no results UI is displayed
    expect(screen.getByText('nonexistent')).toBeInTheDocument();
    expect(screen.getByText(/No photos found for nonexistent/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('photos-preview-empty'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('renders photos correctly when data is available', async () => {
    // Mock successful data fetching
    mockUseQuery.mockReturnValue({
      data: { results: photos },
      isLoading: false,
    });

    render(<PhotosPreview topic="landscapes" onClick={mockOnClick} />);

    // Check if photos are displayed
    expect(screen.getByText('landscapes')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getByAltText('Photo 1')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 2')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 3')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('photos-preview'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
