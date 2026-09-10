import { createFileRoute } from '@tanstack/react-router';
import ScheduleMatchDetail from '../../../pages/prototype/ScheduleMatchDetail';

export const Route = createFileRoute('/_prototype/schedule/')({
  component: ScheduleMatchDetail
});
