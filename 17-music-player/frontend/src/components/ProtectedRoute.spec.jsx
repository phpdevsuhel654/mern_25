import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import ProtectedRoute from './ProtectedRoute';

const mockUseAuth = vi.fn();

vi.mock('../context/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}));

describe('ProtectedRoute', () => {
  it('shows loading state while session is being checked', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, loading: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private Page</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Checking session...')).toBeInTheDocument();
  });

  it('renders children for authenticated users', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, loading: false });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private Page</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Private Page')).toBeInTheDocument();
  });
});
