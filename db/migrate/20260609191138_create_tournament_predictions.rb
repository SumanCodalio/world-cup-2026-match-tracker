class CreateTournamentPredictions < ActiveRecord::Migration[7.2]
  def change
    create_table :tournament_predictions do |t|
      t.references :team, null: false, foreign_key: true
      t.string :prediction_type, null: false
      t.float :probability, null: false
      t.text :rationale

      t.timestamps
    end
  end
end
