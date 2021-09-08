class CreateGmaps < ActiveRecord::Migration[6.1]
  def change
    create_table :gmaps do |t|
      t.string :title
      t.text :comment
      t.string :magic_word
      t.float :latitude
      t.float :longitude
      t.integer :user_id

      t.timestamps
    end
  end
end
