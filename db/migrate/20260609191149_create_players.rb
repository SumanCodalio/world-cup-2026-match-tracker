class CreatePlayers < ActiveRecord::Migration[7.2]
  def change
    create_table :players do |t|
      t.references :team, null: false, foreign_key: true
      t.string :name, null: false
      t.string :position, null: false
      t.integer :jersey_number, null: false

      t.timestamps
    end
  end
end
