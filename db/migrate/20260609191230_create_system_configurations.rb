class CreateSystemConfigurations < ActiveRecord::Migration[7.2]
  def change
    create_table :system_configurations do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :setting_key, null: false
      t.string :setting_value, null: false
      t.text :description

      t.timestamps
    end
  end
end
