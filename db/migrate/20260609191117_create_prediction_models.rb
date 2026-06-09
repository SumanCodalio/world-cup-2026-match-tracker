class CreatePredictionModels < ActiveRecord::Migration[7.2]
  def change
    create_table :prediction_models do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :name, null: false
      t.string :version, null: false
      t.boolean :is_active, null: false, default: true
      t.float :hit_rate

      t.timestamps
    end
  end
end
