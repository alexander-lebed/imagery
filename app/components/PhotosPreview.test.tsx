import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import PhotosPreview from '../components/PhotosPreview';

// Mock the useQuery hook
const mockUseQuery = useQuery as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('PhotosPreview', () => {
  it('renders loading state correctly', () => {
    // Mock the loading state
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<PhotosPreview topic="nature" />);

    // Check if loading UI is displayed
    expect(screen.getByText('nature')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('renders no results state correctly', () => {
    // Mock the no results state
    mockUseQuery.mockReturnValue({
      data: { results: [] },
      isLoading: false,
    });

    render(<PhotosPreview topic="nonexistent" />);

    // Check if no results UI is displayed
    expect(screen.getByText('nonexistent')).toBeInTheDocument();
    expect(screen.getByText(/No photos found for nonexistent/i)).toBeInTheDocument();
  });

  it('renders photos correctly when data is available', () => {
    // Mock successful data fetching
    const mockPhotos = {
      results: [
        {
          id: '1',
          alt_description: 'Photo 1',
          urls: { small: 'photo1.jpg' },
        },
        {
          id: '2',
          alt_description: 'Photo 2',
          urls: { small: 'photo2.jpg' },
        },
        {
          id: '3',
          alt_description: 'Photo 3',
          urls: { small: 'photo3.jpg' },
        },
      ],
    };

    mockUseQuery.mockReturnValue({
      data: mockPhotos,
      isLoading: false,
    });

    render(<PhotosPreview topic="landscapes" />);

    // Check if photos are displayed
    expect(screen.getByText('landscapes')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getByAltText('Photo 1')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 2')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 3')).toBeInTheDocument();
  });
});
