import { createFileRoute } from '@tanstack/react-router';
import EditPlayer from '../../../pages/prototype/EditPlayer';

export const Route = createFileRoute('/_prototype/players/$playerId/edit')({
  component: EditPlayer
});
