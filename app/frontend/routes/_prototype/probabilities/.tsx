import { createFileRoute } from '@tanstack/react-router';
import ProbabilityMatchDetail from '../../../pages/prototype/ProbabilityMatchDetail';

export const Route = createFileRoute('/_prototype/probabilities/')({
  component: ProbabilityMatchDetail
});
