class CreateVenues < ActiveRecord::Migration[7.2]
  def change
    create_table :venues do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :name, null: false
      t.string :city, null: false
      t.integer :capacity, null: false
      t.string :timezone, null: false

      t.timestamps
    end
  end
end
