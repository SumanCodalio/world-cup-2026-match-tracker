import { createFileRoute } from '@tanstack/react-router';
import AdminPortal from '../../../pages/prototype/AdminPortal';

export const Route = createFileRoute('/_prototype/admin/')({
  component: AdminPortal
});
