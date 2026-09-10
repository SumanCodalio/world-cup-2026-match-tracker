import { createFileRoute } from '@tanstack/react-router';
import AdminMatches from '../../../pages/prototype/AdminMatches';

export const Route = createFileRoute('/_prototype/admin/matches')({
  component: AdminMatches
});
