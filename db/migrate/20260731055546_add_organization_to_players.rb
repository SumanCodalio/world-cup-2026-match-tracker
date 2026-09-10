class AddOrganizationToPlayers < ActiveRecord::Migration[8.0]
  def change
    add_reference :players, :organization, null: true, foreign_key: true

    up_only do
      org = Organization.first
      Player.update_all(organization_id: org.id) if org
    end
  end
end
