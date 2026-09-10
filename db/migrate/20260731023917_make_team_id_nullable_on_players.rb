class MakeTeamIdNullableOnPlayers < ActiveRecord::Migration[8.0]
  def change
    change_column_null :players, :team_id, true
    change_column_null :players, :jersey_number, true
  end
end
