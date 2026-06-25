import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import ProtectedAdminRoute from './ProtectedAdminRoute';

const mockUseAdminAuth = vi.fn();

vi.mock('../context/AdminAuthContext', () => ({
  useAdminAuth: () => mockUseAdminAuth()
}));

describe('ProtectedAdminRoute', () => {
  it('shows loading state while admin auth is checked', () => {
    mockUseAdminAuth.mockReturnValue({ isAuthenticated: false, loading: true });

    render(
      <MemoryRouter>
        <ProtectedAdminRoute>
          <div>Admin Content</div>
        </ProtectedAdminRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Validating admin session...')).toBeInTheDocument();
  });

  it('renders children when admin is authenticated', () => {
    mockUseAdminAuth.mockReturnValue({ isAuthenticated: true, loading: false });

    render(
      <MemoryRouter>
        <ProtectedAdminRoute>
          <div>Admin Content</div>
        </ProtectedAdminRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });
});
