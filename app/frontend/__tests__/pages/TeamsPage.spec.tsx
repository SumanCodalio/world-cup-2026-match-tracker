import { render, screen, fireEvent } from '@testing-library/react';
import { TeamsPage } from '../../pages/TeamsPage';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockMutateCreate = vi.fn();
const mockMutateDelete = vi.fn();
const mockRefetch = vi.fn();

vi.mock('@rhino-project/core/hooks', () => ({
  useBaseOwnerId: () => 1,
  useModelIndex: () => ({
    resources: {
      results: [
        {
          id: 1,
          name: 'Real Madrid',
          group_name: 'RMA',
          players: [
            { id: 101, name: 'Kylian Mbappe', position: 'Forward', jersey_number: 9 }
          ]
        }
      ]
    },
    isPending: false,
    error: null,
    refetch: mockRefetch
  }),
  useModelCreate: () => ({
    mutate: mockMutateCreate,
    isPending: false
  }),
  useModelDelete: () => ({
    mutate: mockMutateDelete,
    isPending: false
  })
}));

describe('TeamsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders teams and squad members', () => {
    render(<TeamsPage />);
    expect(screen.getByText('Teams')).toBeDefined();
    expect(screen.getByText('Real Madrid')).toBeDefined();
    expect(screen.getByText('Code: RMA')).toBeDefined();
    expect(screen.getByText('#9 Kylian Mbappe')).toBeDefined();
  });

  it('opens add team modal when button clicked', () => {
    render(<TeamsPage />);
    const addButton = screen.getByText('+ Add New Team');
    fireEvent.click(addButton);
    expect(screen.getByText('Team Squad Roster')).toBeDefined();
  });
});
