import { createFileRoute } from '@tanstack/react-router';
import PrototypeLayout from '../components/prototype/Layout';

export const Route = createFileRoute('/_prototype')({
  component: PrototypeLayout
});
