import { createFileRoute } from '@tanstack/react-router';
import UserProfile from '../../../pages/prototype/UserProfile';

export const Route = createFileRoute('/_prototype/user/profile')({
  component: UserProfile
});
