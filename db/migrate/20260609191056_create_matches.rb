class CreateMatches < ActiveRecord::Migration[7.2]
  def change
    create_table :matches do |t|
      t.references :venue, null: false, foreign_key: true
      t.datetime :kickoff_time, null: false
      t.string :stage, null: false
      t.string :status, null: false

      t.timestamps
    end
  end
end
