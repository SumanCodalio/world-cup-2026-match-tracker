import { createFileRoute } from '@tanstack/react-router';
import LoginPage from '../../pages/prototype/LoginPage';

export const Route = createFileRoute('/auth/signin')({
  component: LoginPage
});
