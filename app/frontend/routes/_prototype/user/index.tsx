import { createFileRoute } from '@tanstack/react-router';
import UserPortal from '../../../pages/prototype/UserPortal';

export const Route = createFileRoute('/_prototype/user/')({
  component: UserPortal
});
