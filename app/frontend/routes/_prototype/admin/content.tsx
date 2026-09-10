import { createFileRoute } from '@tanstack/react-router';
import AdminContent from '../../../pages/prototype/AdminContent';

export const Route = createFileRoute('/_prototype/admin/content')({
  component: AdminContent
});
