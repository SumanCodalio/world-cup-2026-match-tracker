import { createFileRoute } from '@tanstack/react-router';
import Probabilities from '../../../pages/prototype/Probabilities';

export const Route = createFileRoute('/_prototype/probabilities/')({
  component: Probabilities
});
