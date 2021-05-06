class CreateCoffees < ActiveRecord::Migration[6.1]
  def change
    create_table :coffees do |t|
      t.string :name
      t.string :slug
      t.string :image_url

      t.timestamps
    end
  end
end
