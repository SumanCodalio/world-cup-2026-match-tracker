import { createFileRoute } from '@tanstack/react-router';
import UserSettings from '../../../pages/prototype/UserSettings';

export const Route = createFileRoute('/_prototype/user/settings')({
  component: UserSettings
});
