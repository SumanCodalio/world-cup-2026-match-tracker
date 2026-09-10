import { createFileRoute } from '@tanstack/react-router';
import AddPlayer from '../../../pages/prototype/AddPlayer';

export const Route = createFileRoute('/_prototype/players/new')({
  component: AddPlayer
});
