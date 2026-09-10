import { ModelIndexPage } from '@rhino-project/ui-heroui';
import { createFileRoute } from '@tanstack/react-router';
import TeamsPage from '../../../../pages/TeamsPage';

export const Route = createFileRoute('/_authenticated/$owner/$model/')({
  component: RouteComponent
});

function RouteComponent() {
  const { model } = Route.useParams();

  if (model === 'teams' || model === 'team') {
    return <TeamsPage />;
  }

  return <ModelIndexPage model={model} syncUrl />;
}
