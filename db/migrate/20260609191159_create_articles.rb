class CreateArticles < ActiveRecord::Migration[7.2]
  def change
    create_table :articles do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :title, null: false
      t.text :content, null: false
      t.datetime :published_at
      t.string :image_url

      t.timestamps
    end
  end
end
