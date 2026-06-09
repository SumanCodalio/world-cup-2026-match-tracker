class CreateMatchTeams < ActiveRecord::Migration[7.2]
  def change
    create_table :match_teams do |t|
      t.references :match, null: false, foreign_key: true
      t.references :team, null: false, foreign_key: true
      t.boolean :is_home, null: false, default: false
      t.integer :score, null: false, default: 0

      t.timestamps
    end
  end
end
