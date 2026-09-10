import { createFileRoute } from '@tanstack/react-router';
import TeamDetail from '../../../pages/prototype/TeamDetail';

export const Route = createFileRoute('/_prototype/teams/')({
  component: TeamDetail
});
