import { createFileRoute } from '@tanstack/react-router';
import Players from '../../../pages/prototype/Players';

export const Route = createFileRoute('/_prototype/players/')({
  component: Players
});
