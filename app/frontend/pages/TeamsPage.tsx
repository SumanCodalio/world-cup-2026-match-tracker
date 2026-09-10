import React, { useState } from 'react';
import { useModelIndex, useModelCreate, useModelDelete, useBaseOwnerId } from '@rhino-project/core/hooks';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  useDisclosure,
  Select,
  SelectItem
} from '@heroui/react';

interface SquadMember {
  id: string;
  name: string;
  position: string;
  jersey_number: number | string;
}

const POSITIONS = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

export const TeamsPage = () => {
  const baseOwnerId = useBaseOwnerId();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Model queries & mutations
  const { resources, isPending, error, refetch } = useModelIndex('team', {
    order: 'created_at desc'
  });

  const { mutate: createTeam, isPending: isSaving } = useModelCreate('team', {
    onSuccess: () => {
      resetForm();
      onClose();
      refetch();
    }
  });

  const { mutate: deleteTeam } = useModelDelete('team', {
    onSuccess: () => {
      refetch();
    }
  });

  // Form State
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [squad, setSquad] = useState<SquadMember[]>([]);

  // Squad Member State
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState('Forward');
  const [playerJersey, setPlayerJersey] = useState('');

  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setTeamName('');
    setTeamCode('');
    setSquad([]);
    setPlayerName('');
    setPlayerPosition('Forward');
    setPlayerJersey('');
    setFormError('');
  };

  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      setFormError('Player name is required');
      return;
    }
    if (!playerJersey) {
      setFormError('Jersey number is required');
      return;
    }

    setSquad([
      ...squad,
      {
        id: Date.now().toString(),
        name: playerName.trim(),
        position: playerPosition,
        jersey_number: playerJersey
      }
    ]);

    setPlayerName('');
    setPlayerJersey('');
    setFormError('');
  };

  const handleRemovePlayer = (id: string) => {
    setSquad(squad.filter((p) => p.id !== id));
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setFormError('Team name is required');
      return;
    }
    if (!teamCode.trim()) {
      setFormError('Team code is required');
      return;
    }

    const players_attributes = squad.map((member) => ({
      name: member.name,
      position: member.position,
      jersey_number: Number(member.jersey_number) || 0
    }));

    createTeam({
      name: teamName.trim(),
      group_name: teamCode.trim(),
      status: 'active',
      organization_id: baseOwnerId,
      players_attributes
    });
  };

  const handleDeleteTeam = (id: number) => {
    if (confirm('Are you sure you want to delete this team?')) {
      deleteTeam({ id });
    }
  };

  const teams = resources?.results || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground text-sm">
            Manage teams, team codes, and squad rosters.
          </p>
        </div>
        <Button color="primary" onPress={onOpen}>
          + Add New Team
        </Button>
      </div>

      {isPending ? (
        <div>Loading teams...</div>
      ) : error ? (
        <div className="text-danger">Error loading teams.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team: any) => (
            <Card key={team.id} className="shadow-sm border border-default-100">
              <CardHeader className="flex justify-between items-start pb-2">
                <div>
                  <h3 className="text-lg font-semibold">{team.name}</h3>
                  <Chip size="sm" variant="flat" color="secondary" className="mt-1">
                    Code: {team.group_name}
                  </Chip>
                </div>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onPress={() => handleDeleteTeam(team.id)}
                >
                  Delete
                </Button>
              </CardHeader>
              <CardBody>
                <div className="text-sm font-medium mb-2">
                  Squad ({team.players?.length || 0} players):
                </div>
                {team.players && team.players.length > 0 ? (
                  <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
                    {team.players.map((player: any) => (
                      <li key={player.id} className="flex justify-between items-center border-b border-default-100 py-1">
                        <span>
                          #{player.jersey_number} {player.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {player.position}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No players in squad</p>
                )}
              </CardBody>
            </Card>
          ))}
          {teams.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No teams added yet. Click "+ Add New Team" to get started.
            </div>
          )}
        </div>
      )}

      {/* Add Team Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside">
        <ModalContent>
          {(onCloseModal) => (
            <form onSubmit={handleCreateTeam}>
              <ModalHeader className="flex flex-col gap-1">Add New Team</ModalHeader>
              <ModalBody className="space-y-4">
                {formError && (
                  <div className="p-2 bg-danger-50 text-danger rounded text-sm">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Team Name"
                    placeholder="e.g. Real Madrid"
                    value={teamName}
                    onValueChange={setTeamName}
                    isRequired
                  />
                  <Input
                    label="Team Code"
                    placeholder="e.g. RMA"
                    value={teamCode}
                    onValueChange={setTeamCode}
                    isRequired
                  />
                </div>

                <div className="border-t border-default-200 pt-4">
                  <h4 className="text-md font-semibold mb-3">Team Squad Roster</h4>

                  {/* Add squad member form */}
                  <div className="flex flex-col md:flex-row gap-2 items-end mb-4 bg-default-50 p-3 rounded-lg">
                    <Input
                      label="Player Name"
                      placeholder="e.g. Kylian Mbappe"
                      value={playerName}
                      onValueChange={setPlayerName}
                      className="flex-1"
                    />
                    <Select
                      label="Position"
                      selectedKeys={[playerPosition]}
                      onChange={(e) => setPlayerPosition(e.target.value)}
                      className="w-full md:w-36"
                    >
                      {POSITIONS.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      label="Jersey #"
                      type="number"
                      placeholder="9"
                      value={playerJersey}
                      onValueChange={setPlayerJersey}
                      className="w-full md:w-24"
                    />
                    <Button type="button" color="secondary" onPress={handleAddPlayer}>
                      Add Player
                    </Button>
                  </div>

                  {/* Squad list table */}
                  {squad.length > 0 ? (
                    <Table aria-label="Squad Roster Table">
                      <TableHeader>
                        <TableColumn>JERSEY #</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>POSITION</TableColumn>
                        <TableColumn>ACTION</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {squad.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>#{member.jersey_number}</TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.position}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                color="danger"
                                variant="light"
                                onPress={() => handleRemovePlayer(member.id)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      No players added to the squad yet. Add players using the form above.
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" color="default" onPress={onCloseModal}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" isLoading={isSaving}>
                  Create Team
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TeamsPage;
