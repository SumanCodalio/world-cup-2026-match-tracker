class AddDetailsToPlayers < ActiveRecord::Migration[8.0]
  def change
    add_column :players, :surname, :string
    add_column :players, :nationality, :string
    add_column :players, :club, :string
  end
end
