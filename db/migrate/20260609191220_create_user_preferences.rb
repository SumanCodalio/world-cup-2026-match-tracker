class CreateUserPreferences < ActiveRecord::Migration[7.2]
  def change
    create_table :user_preferences do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :timezone, null: false
      t.boolean :receive_notifications, null: false, default: true

      t.timestamps
    end
  end
end
