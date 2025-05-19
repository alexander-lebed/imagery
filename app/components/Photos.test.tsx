import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { photos } from '@/app/mockedData';
import Photos from './Photos';

// Mock the useQuery hook
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn().mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
  }),
}));

const mockUseQuery = useQuery as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Photos', () => {
  it('renders nothing when search is empty', () => {
    render(<Photos search="" />);
    expect(screen.queryByText('Loading photos...')).not.toBeInTheDocument();
    expect(screen.queryByText('No photos found')).not.toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<Photos search="nature" />);

    expect(screen.getByText('Loading photos...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<Photos search="nature" />);

    expect(screen.getByText('No photos found')).toBeInTheDocument();
  });

  it('renders no results state correctly', () => {
    mockUseQuery.mockReturnValue({
      data: { results: [] },
      isLoading: false,
      isError: false,
    });

    render(<Photos search="nonexistent" />);

    expect(screen.getByText('No photos found')).toBeInTheDocument();
  });

  it('renders photos correctly when data is available', () => {
    mockUseQuery.mockReturnValue({
      data: { results: photos },
      isLoading: false,
      isError: false,
    });

    render(<Photos search="landscapes" />);

    // Check if photos are displayed
    const photoComponents = screen.getAllByRole('img', { name: /Photo/i });
    expect(photoComponents).toHaveLength(3);

    // Check if all images are rendered
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(screen.getByAltText('Photo 1')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 2')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 3')).toBeInTheDocument();
  });
});
