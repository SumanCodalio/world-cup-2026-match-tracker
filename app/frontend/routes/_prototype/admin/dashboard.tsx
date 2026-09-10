import { createFileRoute } from '@tanstack/react-router';
import AdminDashboard from '../../../pages/prototype/AdminDashboard';

export const Route = createFileRoute('/_prototype/admin/dashboard')({
  component: AdminDashboard
});
