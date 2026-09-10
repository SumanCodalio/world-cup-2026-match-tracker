import { createFileRoute } from '@tanstack/react-router';
import UserDashboard from '../../../pages/prototype/UserDashboard';

export const Route = createFileRoute('/_prototype/user/dashboard')({
  component: UserDashboard
});
