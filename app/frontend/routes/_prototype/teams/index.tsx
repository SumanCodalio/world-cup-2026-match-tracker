import { createFileRoute } from '@tanstack/react-router';
import Teams from '../../../pages/prototype/Teams';

export const Route = createFileRoute('/_prototype/teams/')({
  component: Teams
});
