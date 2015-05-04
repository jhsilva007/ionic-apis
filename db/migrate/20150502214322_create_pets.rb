class CreatePets < ActiveRecord::Migration
  def change
    create_table :pets do |t|
      t.float :lalitude
      t.float :longitude
      t.string :imagen

      t.timestamps null: false
    end
  end
end
