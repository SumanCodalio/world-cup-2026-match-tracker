class CreateTeams < ActiveRecord::Migration[7.2]
  def change
    create_table :teams do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :name, null: false
      t.string :group_name, null: false
      t.string :flag_url
      t.string :status, null: false

      t.timestamps
    end
  end
end
