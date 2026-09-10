import { createFileRoute } from '@tanstack/react-router';
import Landing from '../../pages/prototype/Landing';

export const Route = createFileRoute('/_prototype/')({
  component: Landing
});
