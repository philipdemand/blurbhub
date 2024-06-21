class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.text :comment_body
      t.belongs_to :post, null: false, foreign_key: true
      t.belongs_to :user
      t.timestamps
    end
  end
end
