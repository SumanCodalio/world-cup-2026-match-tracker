class CreateMatchProbabilities < ActiveRecord::Migration[7.2]
  def change
    create_table :match_probabilities do |t|
      t.references :match, null: false, foreign_key: true
      t.references :prediction_model, null: false, foreign_key: true
      t.float :home_win_prob, null: false
      t.float :away_win_prob, null: false
      t.float :draw_prob, null: false
      t.text :factors_summary

      t.timestamps
    end
  end
end
