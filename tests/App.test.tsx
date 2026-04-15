import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders branding and navigation', () => {
    render(<App />);
    expect(screen.getByText('IS-JMP')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('CAPS')).toBeInTheDocument();
  });
});
