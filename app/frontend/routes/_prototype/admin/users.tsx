import { createFileRoute } from '@tanstack/react-router';
import AdminUsers from '../../../pages/prototype/AdminUsers';

export const Route = createFileRoute('/_prototype/admin/users')({
  component: AdminUsers
});
