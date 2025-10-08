import { render, screen, waitFor } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import Guard from '../Guard'; // Adjust import path as needed
import { isAuthed } from '@/lib/auth'; // Adjust import path as needed

// Mocks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  isAuthed: vi.fn(),
}));

describe('Guard component', () => {
  const mockRouterReplace = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockRouterReplace.mockReset();
    (useRouter as vi.Mock).mockReturnValue({ replace: mockRouterReplace });
  });

  it('should render children if the user is authenticated', async () => {
    // Arrange
    (usePathname as vi.Mock).mockReturnValue('/products');
    (isAuthed as vi.Mock).mockReturnValue(true); // User is authenticated

    // Act
    render(<Guard><div>Protected Content</div></Guard>);

    // Assert
    expect(await screen.findByText('Protected Content')).toBeInTheDocument();
    expect(mockRouterReplace).not.toHaveBeenCalled(); // No redirect should happen
  });

  it('should redirect to /login if not authenticated and not on /login page', async () => {
    // Arrange
    (usePathname as vi.Mock).mockReturnValue('/products'); // User is not on /login page
    (isAuthed as vi.Mock).mockReturnValue(false); // User is not authenticated

    // Act
    render(<Guard><div>Protected Content</div></Guard>);

    // Assert
    await waitFor(() => expect(mockRouterReplace).toHaveBeenCalledWith('/login')); // Redirect should happen
  });
});
